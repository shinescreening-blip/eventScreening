import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4 (GA4) Setup
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID
    
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    document.head.appendChild(script2);

    // Google Search Console verification
    const searchConsoleVerification = document.createElement('meta');
    searchConsoleVerification.name = 'google-site-verification';
    searchConsoleVerification.content = 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE'; // Replace with actual code
    document.head.appendChild(searchConsoleVerification);

    // Bing Webmaster Tools verification (optional)
    const bingVerification = document.createElement('meta');
    bingVerification.name = 'msvalidate.01';
    bingVerification.content = 'YOUR_BING_VERIFICATION_CODE'; // Replace with actual code
    document.head.appendChild(bingVerification);

    // Cleanup function
    return () => {
      // Remove scripts when component unmounts (optional)
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(searchConsoleVerification);
      document.head.removeChild(bingVerification);
    };
  }, []);

  return null; // This component doesn't render anything
};

// Helper function to track events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Helper function to track page views
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

export default Analytics;
