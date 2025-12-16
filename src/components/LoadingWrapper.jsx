import React, { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

/**
 * LoadingWrapper component to manually control loading state for specific components
 * Usage: Wrap any component that needs to show loading state
 */
const LoadingWrapper = ({ 
  children, 
  isLoading = false, 
  loadingText = 'Loading...', 
  showGlobalLoader = false 
}) => {
  const { setLoading } = useLoading();

  useEffect(() => {
    if (showGlobalLoader) {
      setLoading(isLoading);
    }

    // Cleanup when component unmounts
    return () => {
      if (showGlobalLoader) {
        setLoading(false);
      }
    };
  }, [isLoading, showGlobalLoader, setLoading]);

  if (isLoading && !showGlobalLoader) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">{loadingText}</p>
        </div>
      </div>
    );
  }

  return children;
};

export default LoadingWrapper;
