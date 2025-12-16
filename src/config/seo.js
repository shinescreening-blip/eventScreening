// SEO Configuration for EventWeb

export const seoConfig = {
  // Default site information
  siteName: 'EventWeb',
  siteUrl: 'https://eventweb.com', // Replace with your actual domain
  defaultTitle: 'EventWeb - Premium Event Booking & Venue Management',
  defaultDescription: 'Book premium events, movie screenings, and venues with EventWeb. Discover exclusive events, private screenings, and world-class venues for your special occasions.',
  defaultKeywords: 'event booking, movie screening, venue booking, private events, cinema booking, event management, premium venues, entertainment, tickets',
  defaultImage: '/og-image.jpg',
  
  // Social media handles
  social: {
    twitter: '@eventweb',
    facebook: '',
    instagram: '',
    linkedin: ''
  },
  
  // Contact information
  contact: {
    phone: '+91-XXXXXXXXXX',
    email: 'info@eventweb.com',
    address: {
      street: 'Your Address',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postalCode: '400001'
    }
  },
  
  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'EventWeb - Premium Event Booking & Venue Management',
      description: 'Book premium events, movie screenings, and venues with EventWeb. Discover exclusive events, private screenings, and world-class venues for your special occasions in Mumbai and across India.',
      keywords: 'event booking, movie screening, venue booking, private events, cinema booking, event management, premium venues, entertainment, tickets, Mumbai events'
    },
    events: {
      title: 'Events - Premium Movie Screenings & Entertainment | EventWeb',
      description: 'Discover and book premium events, movie screenings, and entertainment experiences. Browse upcoming events in Mumbai and book your tickets for exclusive screenings and live events.',
      keywords: 'events, movie screenings, entertainment, premium events, cinema booking, live events, Mumbai events, event tickets'
    },
    venues: {
      title: 'Premium Venues - Event Spaces & Cinema Halls | EventWeb',
      description: 'Discover and book premium venues for events, private screenings, and special occasions. Browse luxury event spaces, cinema halls, and venues across Mumbai and India.',
      keywords: 'premium venues, event spaces, cinema halls, venue booking, private screening venues, luxury venues, event halls, Mumbai venues'
    },
    gallery: {
      title: 'Gallery - Event Photos & Venue Showcases | EventWeb',
      description: 'Explore our gallery of premium events, venue showcases, and memorable moments. Get inspired for your next event with our collection of high-quality event photography.',
      keywords: 'event gallery, venue photos, event photography, premium events gallery, venue showcases'
    },
    about: {
      title: 'About EventWeb - Premium Event Management Platform',
      description: 'Learn about EventWeb, your premier destination for premium event booking, movie screenings, and venue management. Discover our mission to connect communities through exceptional experiences.',
      keywords: 'about eventweb, event management company, premium events, movie screening platform, venue booking service'
    },
    contact: {
      title: 'Contact EventWeb - Get in Touch for Premium Events',
      description: 'Contact EventWeb for premium event booking, venue inquiries, and customer support. Get in touch with our team for personalized event planning and assistance.',
      keywords: 'contact eventweb, event booking support, venue inquiries, customer service, event planning assistance'
    },
    faq: {
      title: 'FAQ - Frequently Asked Questions | EventWeb',
      description: 'Find answers to frequently asked questions about event booking, venue reservations, payments, and more. Get quick help with EventWeb services.',
      keywords: 'eventweb faq, event booking questions, venue booking help, payment questions, customer support'
    },
    privateScreening: {
      title: 'Private Screening - Exclusive Cinema Experience | EventWeb',
      description: 'Book exclusive private movie screenings for your group. Enjoy premium cinema experience with personalized service and luxury amenities.',
      keywords: 'private screening, exclusive cinema, private movie screening, luxury cinema experience, group bookings'
    },
    giftCard: {
      title: 'Gift Cards - Perfect Gift for Event Lovers | EventWeb',
      description: 'Give the gift of premium entertainment with EventWeb gift cards. Perfect for movie lovers and event enthusiasts. Available in various denominations.',
      keywords: 'eventweb gift cards, event gift cards, movie gift cards, entertainment gifts, premium experience gifts'
    }
  },
  
  // Analytics and tracking
  analytics: {
    googleAnalytics: 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
    googleSearchConsole: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    bingWebmaster: 'YOUR_BING_VERIFICATION_CODE',
    facebookPixel: 'YOUR_FACEBOOK_PIXEL_ID' // Optional
  },
  
  // Technical SEO settings
  technical: {
    robotsPolicy: 'index, follow',
    language: 'en',
    locale: 'en_US',
    themeColor: '#facc15',
    tileColor: '#facc15'
  }
};

// Helper function to get page-specific SEO data
export const getPageSEO = (pageName) => {
  const pageConfig = seoConfig.pages[pageName];
  if (!pageConfig) {
    return {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: seoConfig.defaultKeywords
    };
  }
  return pageConfig;
};

// Helper function to generate canonical URL
export const getCanonicalUrl = (path = '') => {
  return `${seoConfig.siteUrl}${path}`;
};

// Helper function to generate Open Graph image URL
export const getOGImageUrl = (imagePath = seoConfig.defaultImage) => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${seoConfig.siteUrl}${imagePath}`;
};
