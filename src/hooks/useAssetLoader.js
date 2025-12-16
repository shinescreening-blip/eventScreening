import { useState, useEffect, useCallback } from 'react';

export const useAssetLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  // Function to get all images and videos from the DOM
  const getAllAssets = useCallback(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const videos = Array.from(document.querySelectorAll('video'));
    const youtubeIframes = Array.from(document.querySelectorAll('iframe[src*="youtube"]'));
    const regularIframes = Array.from(document.querySelectorAll('iframe:not([src*="youtube"])'));
    
    return [...images, ...videos, ...youtubeIframes, ...regularIframes];
  }, []);

  // Function to check if an asset is loaded
  const isAssetLoaded = (asset) => {
    if (asset.tagName === 'IMG') {
      return asset.complete && asset.naturalHeight !== 0;
    }
    if (asset.tagName === 'VIDEO') {
      return asset.readyState >= 3; // HAVE_FUTURE_DATA or higher
    }
    if (asset.tagName === 'IFRAME') {
      // For iframes, we need to check if they're loaded
      // YouTube iframes are tricky, so we'll use a combination of checks
      return asset.contentDocument !== null || asset.src !== '';
    }
    return true;
  };

  // Function to load a single asset
  const loadAsset = (asset) => {
    return new Promise((resolve) => {
      if (isAssetLoaded(asset)) {
        resolve(asset);
        return;
      }

      const handleLoad = () => {
        cleanup();
        resolve(asset);
      };

      const handleError = () => {
        cleanup();
        resolve(asset); // Resolve even on error to continue loading
      };

      const cleanup = () => {
        asset.removeEventListener('load', handleLoad);
        asset.removeEventListener('error', handleError);
        asset.removeEventListener('loadeddata', handleLoad);
        asset.removeEventListener('canplaythrough', handleLoad);
      };

      if (asset.tagName === 'IMG') {
        asset.addEventListener('load', handleLoad);
        asset.addEventListener('error', handleError);
        
        // If image src is not set yet, wait for it
        if (!asset.src) {
          const observer = new MutationObserver(() => {
            if (asset.src) {
              observer.disconnect();
              if (!isAssetLoaded(asset)) {
                // Re-trigger load check
                asset.addEventListener('load', handleLoad);
                asset.addEventListener('error', handleError);
              } else {
                handleLoad();
              }
            }
          });
          observer.observe(asset, { attributes: true, attributeFilter: ['src'] });
        }
      } else if (asset.tagName === 'VIDEO') {
        asset.addEventListener('loadeddata', handleLoad);
        asset.addEventListener('canplaythrough', handleLoad);
        asset.addEventListener('error', handleError);
      } else if (asset.tagName === 'IFRAME') {
        // Enhanced YouTube iframe loading detection
        if (asset.src.includes('youtube')) {
          // For YouTube iframes, we need to wait longer and use multiple checks
          let checkCount = 0;
          const maxChecks = 30; // 30 checks over 6 seconds
          
          const checkYouTubeLoad = () => {
            checkCount++;
            
            // Check if iframe is ready
            try {
              // Try to access iframe properties (may fail due to CORS)
              if (asset.contentWindow || asset.contentDocument) {
                handleLoad();
                return;
              }
            } catch (e) {
              // CORS error is expected for YouTube, continue checking
            }
            
            // After several checks, consider it loaded
            if (checkCount >= maxChecks) {
              handleLoad();
              return;
            }
            
            // Continue checking every 200ms
            setTimeout(checkYouTubeLoad, 200);
          };
          
          // Start checking after a small delay
          setTimeout(checkYouTubeLoad, 500);
        } else {
          // For regular iframes
          asset.addEventListener('load', handleLoad);
          asset.addEventListener('error', handleError);
          setTimeout(handleLoad, 2000); // Fallback after 2 seconds
        }
      }

      // Fallback timeout
      setTimeout(() => {
        cleanup();
        resolve(asset);
      }, 10000); // 10 second timeout
    });
  };

  // Main loading function
  const loadAllAssets = useCallback(async () => {
    // Wait a bit for DOM to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const assets = getAllAssets();
    setTotalAssets(assets.length);
    setLoadedAssets(0);
    setProgress(0);

    if (assets.length === 0) {
      setProgress(100);
      setIsLoading(false);
      return;
    }

    // Separate high-priority assets (like YouTube videos)
    const highPriorityAssets = assets.filter(asset => 
      asset.dataset?.loadingPriority === 'high' || 
      (asset.tagName === 'IFRAME' && asset.src.includes('youtube'))
    );
    const regularAssets = assets.filter(asset => !highPriorityAssets.includes(asset));

    let loaded = 0;

    // Load high-priority assets first
    if (highPriorityAssets.length > 0) {
      console.log('Loading high-priority assets first:', highPriorityAssets.length);
      for (const asset of highPriorityAssets) {
        try {
          await loadAsset(asset);
          loaded++;
          setLoadedAssets(loaded);
          const newProgress = (loaded / assets.length) * 100;
          setProgress(newProgress);
          console.log(`High-priority asset loaded: ${asset.tagName} (${asset.src || asset.id})`);
        } catch (error) {
          console.warn('High-priority asset loading error:', error);
          loaded++;
          setLoadedAssets(loaded);
          setProgress((loaded / assets.length) * 100);
        }
      }
    }

    // Load regular assets in parallel
    const loadPromises = regularAssets.map(async (asset, index) => {
      try {
        await loadAsset(asset);
        loaded++;
        setLoadedAssets(loaded);
        const newProgress = (loaded / assets.length) * 100;
        setProgress(newProgress);
        
        // Add a small delay between assets for smoother progress
        await new Promise(resolve => setTimeout(resolve, 30));
      } catch (error) {
        console.warn('Asset loading error:', error);
        loaded++;
        setLoadedAssets(loaded);
        setProgress((loaded / assets.length) * 100);
      }
    });

    await Promise.all(loadPromises);

    // Ensure we reach 100% and add a small delay before hiding
    setProgress(100);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
  }, [getAllAssets]);

  // Start loading when component mounts
  useEffect(() => {
    const startLoading = async () => {
      // Minimum loading time for better UX
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
      const assetLoading = loadAllAssets();
      
      await Promise.all([minLoadTime, assetLoading]);
    };

    startLoading();
  }, [loadAllAssets]);

  // Re-scan for new assets when DOM changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      let hasNewAssets = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const newAssets = node.querySelectorAll ? node.querySelectorAll('img, video, iframe') : [];
            if (newAssets.length > 0 || ['IMG', 'VIDEO', 'IFRAME'].includes(node.tagName)) {
              hasNewAssets = true;
            }
            // Specifically check for YouTube iframes
            if (node.tagName === 'IFRAME' && node.src && node.src.includes('youtube')) {
              hasNewAssets = true;
            }
          }
        });
      });

      if (hasNewAssets && !isLoading) {
        // If new assets are found and we're not currently loading, restart loading
        setIsLoading(true);
        loadAllAssets();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [isLoading, loadAllAssets]);

  return {
    isLoading,
    progress,
    loadedAssets,
    totalAssets,
    reload: loadAllAssets
  };
};
