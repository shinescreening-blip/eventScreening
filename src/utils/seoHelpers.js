// SEO Helper Functions

/**
 * Generate SEO-friendly URL slug from title
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Truncate text for meta descriptions (ideal length: 150-160 characters)
 */
export const truncateDescription = (text, maxLength = 155) => {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

/**
 * Generate keywords from event/venue data
 */
export const generateKeywords = (item, baseKeywords = []) => {
  const keywords = [...baseKeywords];
  
  if (item.title) {
    keywords.push(item.title.toLowerCase());
  }
  
  if (item.type) {
    keywords.push(item.type.toLowerCase());
  }
  
  if (item.city) {
    keywords.push(`${item.city.toLowerCase()} events`);
  }
  
  if (item.genre) {
    keywords.push(item.genre.toLowerCase());
  }
  
  // Remove duplicates and return as comma-separated string
  return [...new Set(keywords)].join(', ');
};

/**
 * Format date for structured data (ISO 8601 format)
 */
export const formatDateForSchema = (date) => {
  if (!date) return new Date().toISOString();
  
  if (typeof date === 'string') {
    return new Date(date).toISOString();
  }
  
  return date.toISOString();
};

/**
 * Generate page title with site name
 */
export const generatePageTitle = (pageTitle, siteName = 'EventWeb') => {
  if (!pageTitle) return siteName;
  return `${pageTitle} | ${siteName}`;
};

/**
 * Extract and clean text content for descriptions
 */
export const cleanTextContent = (htmlOrText) => {
  if (!htmlOrText) return '';
  
  // Remove HTML tags if present
  const textContent = htmlOrText.replace(/<[^>]*>/g, '');
  
  // Clean up extra whitespace
  return textContent.replace(/\s+/g, ' ').trim();
};

/**
 * Generate breadcrumb data for any page
 */
export const generateBreadcrumbs = (path, customLabels = {}) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', path: '/' }];
  
  let currentPath = '';
  
  segments.forEach(segment => {
    currentPath += `/${segment}`;
    const label = customLabels[segment] || 
                  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    breadcrumbs.push({
      name: label,
      path: currentPath
    });
  });
  
  return breadcrumbs;
};

/**
 * Validate and optimize image URLs for social sharing
 */
export const optimizeImageUrl = (imageUrl, baseUrl = '') => {
  if (!imageUrl) return `${baseUrl}/og-image.jpg`;
  
  // If already absolute URL, return as is
  if (imageUrl.startsWith('http')) return imageUrl;
  
  // Make relative URLs absolute
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

/**
 * Generate event-specific meta description
 */
export const generateEventDescription = (event) => {
  const parts = [];
  
  if (event.title) {
    parts.push(`Experience ${event.title}`);
  }
  
  if (event.date) {
    const eventDate = new Date(event.date);
    parts.push(`on ${eventDate.toLocaleDateString()}`);
  }
  
  if (event.venue) {
    parts.push(`at ${event.venue}`);
  }
  
  if (event.city) {
    parts.push(`in ${event.city}`);
  }
  
  parts.push('Book your tickets now for this premium event experience.');
  
  return truncateDescription(parts.join(' '));
};

/**
 * Generate venue-specific meta description
 */
export const generateVenueDescription = (venue) => {
  const parts = [];
  
  if (venue.name) {
    parts.push(`Book ${venue.name}`);
  }
  
  if (venue.location) {
    parts.push(`located in ${venue.location}`);
  }
  
  parts.push('for your special events and occasions. Premium venue with world-class amenities.');
  
  return truncateDescription(parts.join(' '));
};
