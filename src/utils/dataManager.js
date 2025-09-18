// Create a new file: src/utils/dataManager.js

// Central data store using memory (since localStorage is not supported in artifacts)
let globalData = {
  listings: [
    {
      id: 1,
      title: 'Premium Copper Wire Scrap',
      seller: 'MetalCorp Industries',
      price: 850,
      quantity: 500,
      location: 'Mumbai, Maharashtra',
      category: 'Metal Scrap',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      description: 'High-quality copper wire scrap, 99% pure, suitable for recycling and manufacturing.',
      minOrder: 50,
      status: 'Active',
      views: 234,
      inquiries: 12,
      dateCreated: '2025-01-10'
    },
    {
      id: 2,
      title: 'Clean HDPE Plastic Bottles',
      seller: 'EcoPlastic Solutions',
      price: 45,
      quantity: 2000,
      location: 'Delhi, NCR',
      category: 'Plastic Waste',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1572776685600-aca8c3456337?w=300&h=200&fit=crop',
      description: 'Cleaned and sorted HDPE bottles, ready for recycling processes.',
      minOrder: 100,
      status: 'Active',
      views: 189,
      inquiries: 8,
      dateCreated: '2025-01-12'
    },
    {
      id: 3,
      title: 'Aluminum Scrap Sheets',
      seller: 'Sustainable Materials Co.',
      price: 120,
      quantity: 800,
      location: 'Bangalore, Karnataka',
      category: 'Metal Scrap',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop',
      description: 'High-grade aluminum scrap sheets from manufacturing waste.',
      minOrder: 25,
      status: 'Active',
      views: 156,
      inquiries: 15,
      dateCreated: '2025-01-08'
    }
  ],
  nextId: 4
};

// Event listeners for real-time updates
const listeners = new Set();

// Data management functions
export const dataManager = {
  // Get all listings
  getAllListings: () => {
    return [...globalData.listings];
  },

  // Get listings by seller
  getListingsBySeller: (sellerName) => {
    return globalData.listings.filter(listing => listing.seller === sellerName);
  },

  // Add new listing (used by sellers)
  addListing: (listingData) => {
  const newListing = {
    id: globalData.nextId++,
    ...listingData,
    status: 'Active',
    views: 0,
    inquiries: 0,
    rating: 0,
    reviews: 0,
    dateCreated: new Date().toISOString().split('T')[0],
    image: listingData.photos && listingData.photos.length > 0 
      ? listingData.photos[0] 
      : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
  };
  globalData.listings.push(newListing);

    // Notify all listeners about the new listing
    listeners.forEach(listener => listener('listing_added', newListing));
    
    return newListing;
  },

  // Update listing
  updateListing: (id, updates) => {
    const index = globalData.listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
      globalData.listings[index] = { ...globalData.listings[index], ...updates };
      listeners.forEach(listener => listener('listing_updated', globalData.listings[index]));
      return globalData.listings[index];
    }
    return null;
  },

  // Delete listing
  deleteListing: (id) => {
    const index = globalData.listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
      const deletedListing = globalData.listings.splice(index, 1)[0];
      listeners.forEach(listener => listener('listing_deleted', deletedListing));
      return deletedListing;
    }
    return null;
  },

  // Subscribe to data changes
  subscribe: (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  // Category mapping for consistency
  categoryMapping: {
    'metal': 'Metal Scrap',
    'plastic': 'Plastic Waste',
    'textile': 'Textile Waste',
    'ewaste': 'E-Waste',
    'paper': 'Paper Waste'
  },

  // Get category display name
  getCategoryDisplay: (category) => {
    return dataManager.categoryMapping[category] || category;
  }
};

// Helper function to generate realistic sample data
export const generateSampleListing = (overrides = {}) => {
  const sampleTitles = [
    'Premium Copper Wire Scrap',
    'Clean HDPE Plastic Bottles',
    'Aluminum Scrap Sheets',
    'Electronic Component Scrap',
    'Cotton Textile Waste',
    'Paper Waste Bundles',
    'Steel Scrap Metal',
    'PET Bottle Collection'
  ];

  const sampleSellers = [
    'EcoRecycle Solutions',
    'GreenTech Industries',
    'Sustainable Materials Co.',
    'MetalCorp Industries',
    'TechRecycle Hub',
    'TextileGreen Recyclers'
  ];

  const sampleLocations = [
    'Mumbai, Maharashtra',
    'Delhi, NCR',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Hyderabad, Telangana'
  ];

  const sampleCategories = [
    'Metal Scrap',
    'Plastic Waste',
    'Textile Waste',
    'E-Waste',
    'Paper Waste'
  ];

  const randomTitle = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
  const randomSeller = sampleSellers[Math.floor(Math.random() * sampleSellers.length)];
  const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
  const randomCategory = sampleCategories[Math.floor(Math.random() * sampleCategories.length)];

  return {
    title: randomTitle,
    seller: randomSeller,
    location: randomLocation,
    category: randomCategory,
    price: Math.floor(Math.random() * 1000) + 50,
    quantity: Math.floor(Math.random() * 2000) + 100,
    description: `High-quality ${randomTitle.toLowerCase()} suitable for recycling and manufacturing processes.`,
    minOrder: Math.floor(Math.random() * 100) + 25,
    ...overrides
  };
};