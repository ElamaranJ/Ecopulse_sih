// src/utils/dataManager.js - Complete data management utility with reliable images
// src/utils/dataManager.js - Replace with BASE64 images (guaranteed to work)
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
      // Base64 orange square for copper
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0ZGNkIzNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29wcGVyIFdpcmUgU2NyYXA8L3RleHQ+PC9zdmc+',
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
  // FIXED Base64 green square for HDPE (corrected encoding)
  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRDQUY1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SERQRSBQbGFzdGljIEJvdHRsZXM8L3RleHQ+PC9zdmc+',
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
      // Base64 blue square for aluminum
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIxOTZGMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWx1bWludW0gU2hlZXRzPC90ZXh0Pjwvc3ZnPg==',
      description: 'High-grade aluminum scrap sheets from manufacturing waste.',
      minOrder: 25,
      status: 'Active',
      views: 156,
      inquiries: 15,
      dateCreated: '2025-01-08'
    },
    {
      id: 4,
      title: 'Cotton Textile Waste',
      seller: 'TextileGreen Recyclers',
      price: 35,
      quantity: 1500,
      location: 'Tirupur, Tamil Nadu',
      category: 'Textile Waste',
      rating: 4.7,
      reviews: 203,
      // Base64 red-orange square for textile
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0ZGNTcyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q290dG9uIFRleHRpbGU8L3RleHQ+PC9zdmc+',
      description: 'Pure cotton textile waste from garment manufacturing, perfect for recycling into new fabrics.',
      minOrder: 200,
      status: 'Active',
      views: 178,
      inquiries: 9,
      dateCreated: '2025-01-11'
    },
    {
      id: 5,
      title: 'Electronic Component Scrap',
      seller: 'TechRecycle Hub',
      price: 2500,
      quantity: 150,
      location: 'Pune, Maharashtra',
      category: 'E-Waste',
      rating: 4.5,
      reviews: 67,
      // Base64 purple square for e-waste
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzlDMjdCMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RS1XYXN0ZSBDb21wb25lbnRzPC90ZXh0Pjwvc3ZnPg==',
      description: 'Various electronic components and circuit boards for precious metal recovery and recycling.',
      minOrder: 5,
      status: 'Active',
      views: 145,
      inquiries: 18,
      dateCreated: '2025-01-09'
    },
    {
      id: 6,
      title: 'Paper Waste Bundles',
      seller: 'PaperCycle Industries',
      price: 18,
      quantity: 3000,
      location: 'Chennai, Tamil Nadu',
      category: 'Paper Waste',
      rating: 4.4,
      reviews: 91,
      // Base64 brown square for paper
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzc5NTU0OCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UGFwZXIgV2FzdGU8L3RleHQ+PC9zdmc+',
      description: 'Mixed paper waste bundles, sorted and compressed for easy transport and recycling.',
      minOrder: 500,
      status: 'Active',
      views: 267,
      inquiries: 6,
      dateCreated: '2025-01-13'
    },
    {
      id: 7,
      title: 'Steel Scrap Mixed Grade',
      seller: 'Iron & Steel Recyclers',
      price: 650,
      quantity: 1200,
      location: 'Ahmedabad, Gujarat',
      category: 'Metal Scrap',
      rating: 4.6,
      reviews: 134,
      // Base64 gray square for steel
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzYwN0Q4QiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U3RlZWwgU2NyYXA8L3RleHQ+PC9zdmc+',
      description: 'Mixed grade steel scrap from construction and manufacturing industries.',
      minOrder: 100,
      status: 'Active',
      views: 198,
      inquiries: 14,
      dateCreated: '2025-01-14'
    },
    {
      id: 8,
      title: 'PET Bottle Flakes',
      seller: 'PlasticRegen Solutions',
      price: 52,
      quantity: 800,
      location: 'Kolkata, West Bengal',
      category: 'Plastic Waste',
      rating: 4.3,
      reviews: 76,
      // Base64 cyan square for PET
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzAwQkNENCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UEVUIEJvdHRsZSBGbGFrZXM8L3RleHQ+PC9zdmc+',
      description: 'Clean PET bottle flakes, washed and processed, ready for manufacturing new products.',
      minOrder: 50,
      status: 'Active',
      views: 123,
      inquiries: 11,
      dateCreated: '2025-01-15'
    }
  ],
  nextId: 9
};


// Data management functions
export const dataManager = {
  // Get all listings
  getAllListings: () => {
    return [...globalData.listings];
  },

  // Get listing by ID
  getListingById: (id) => {
    return globalData.listings.find(listing => listing.id === id);
  },

  // Get listings by seller
  getListingsBySeller: (sellerName) => {
    return globalData.listings.filter(listing => listing.seller === sellerName);
  },

  // Add new listing
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
        : `https://picsum.photos/400/300?random=${globalData.nextId + 200}`
    };
    globalData.listings.push(newListing);
    dataManager.notifySubscribers('listing_added', newListing);
    return newListing;
  },

  // Update listing
  updateListing: (id, updateData) => {
    const index = globalData.listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
      globalData.listings[index] = { ...globalData.listings[index], ...updateData };
      dataManager.notifySubscribers('listing_updated', globalData.listings[index]);
      return globalData.listings[index];
    }
    return null;
  },

  // Delete listing
  deleteListing: (id) => {
    const index = globalData.listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
      const deletedListing = globalData.listings.splice(index, 1)[0];
      dataManager.notifySubscribers('listing_deleted', deletedListing);
      return deletedListing;
    }
    return null;
  },

  // Filter listings
  filterListings: (filters) => {
    return globalData.listings.filter(listing => {
      if (filters.category && listing.category !== filters.category) return false;
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.minPrice && listing.price < filters.minPrice) return false;
      if (filters.maxPrice && listing.price > filters.maxPrice) return false;
      if (filters.seller && !listing.seller.toLowerCase().includes(filters.seller.toLowerCase())) return false;
      return true;
    });
  },

  // Search listings
  searchListings: (query) => {
    const searchTerm = query.toLowerCase();
    return globalData.listings.filter(listing => 
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.description.toLowerCase().includes(searchTerm) ||
      listing.seller.toLowerCase().includes(searchTerm) ||
      listing.category.toLowerCase().includes(searchTerm)
    );
  },

  // Get listings by category
  getListingsByCategory: (category) => {
    return globalData.listings.filter(listing => listing.category === category);
  },

  // Increment views
  incrementViews: (id) => {
    const listing = globalData.listings.find(l => l.id === id);
    if (listing) {
      listing.views++;
      dataManager.notifySubscribers('listing_viewed', listing);
    }
  },

  // Increment inquiries
  incrementInquiries: (id) => {
    const listing = globalData.listings.find(l => l.id === id);
    if (listing) {
      listing.inquiries++;
      dataManager.notifySubscribers('listing_inquiry', listing);
    }
  },

  // Subscriber system for real-time updates
  subscribers: [],

  subscribe: (callback) => {
    dataManager.subscribers.push(callback);
    return () => {
      dataManager.subscribers = dataManager.subscribers.filter(sub => sub !== callback);
    };
  },

  notifySubscribers: (event, payload) => {
    dataManager.subscribers.forEach(callback => {
      try {
        callback(event, payload);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
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
  },

  // Get statistics
  getStats: () => {
    const listings = globalData.listings;
    const categories = [...new Set(listings.map(l => l.category))];
    const totalListings = listings.length;
    const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
    const totalInquiries = listings.reduce((sum, l) => sum + l.inquiries, 0);
    const avgPrice = listings.reduce((sum, l) => sum + l.price, 0) / listings.length;

    return {
      totalListings,
      totalViews,
      totalInquiries,
      avgPrice: Math.round(avgPrice),
      categories: categories.length,
      categoryBreakdown: categories.map(cat => ({
        category: cat,
        count: listings.filter(l => l.category === cat).length
      }))
    };
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
    image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000) + 500}`,
    ...overrides
  };
};