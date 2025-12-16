import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAssetLoader } from '../hooks/useAssetLoader';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [manualLoading, setManualLoading] = useState(false);
  const assetLoader = useAssetLoader();

  // Combine asset loading with any manual loading states
  const isLoading = isInitialLoad && (assetLoader.isLoading || manualLoading);

  useEffect(() => {
    if (!assetLoader.isLoading && !manualLoading) {
      // Add a small delay before marking initial load as complete
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [assetLoader.isLoading, manualLoading]);

  // Function to manually trigger loading state
  const setLoading = (loading) => {
    setManualLoading(loading);
  };

  // Function to reload assets
  const reloadAssets = () => {
    setIsInitialLoad(true);
    assetLoader.reload();
  };

  const value = {
    isLoading,
    progress: assetLoader.progress,
    loadedAssets: assetLoader.loadedAssets,
    totalAssets: assetLoader.totalAssets,
    setLoading,
    reloadAssets,
    isInitialLoad
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
