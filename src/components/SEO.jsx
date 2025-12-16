import { useEffect } from 'react';

const SEO = ({
  title = 'EventWeb - Premium Event Booking & Venue Management',
  description = 'Book premium events, movie screenings, and venues with EventWeb. Discover exclusive events, private screenings, and world-class venues for your special occasions.',
  keywords = 'event booking, movie screening, venue booking, private events, cinema booking, event management, premium venues',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  structuredData = null
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (element) {
        element.setAttribute('href', href);
      } else {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
        document.head.appendChild(element);
      }
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'EventWeb Team');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'EventWeb', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('theme-color', '#facc15');
    updateMetaTag('msapplication-TileColor', '#facc15');

    // Canonical URL
    updateLinkTag('canonical', url);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      
      if (scriptElement) {
        scriptElement.textContent = JSON.stringify(structuredData);
      } else {
        scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        scriptElement.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptElement);
      }
    }

    // Cleanup function
    return () => {
      // Optional: Remove dynamic meta tags when component unmounts
      // This is usually not necessary for SPAs
    };
  }, [title, description, keywords, image, url, type, structuredData]);

  return null; // This component doesn't render anything
};

export default SEO;
