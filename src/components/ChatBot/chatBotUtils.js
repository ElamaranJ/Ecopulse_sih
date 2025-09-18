// src/components/ChatBot/chatBotUtils.js

// EcoPulse ChatBot Knowledge Base
export const chatBotResponses = {
  // Greetings
  greetings: [
    "Hi there! 👋 Welcome to EcoPulse! I'm here to help you with anything related to our sustainable marketplace.",
    "Hello! 🌱 I'm your EcoPulse assistant. How can I help you today?",
    "Hey! 💚 Ready to make some eco-friendly deals? What can I help you with?"
  ],

  // Marketplace FAQ
  marketplace: {
    "how to buy": "To buy materials: 1) Browse the marketplace 2) Click on items you like 3) Add to cart 4) Checkout and arrange pickup/delivery! 🛒",
    "payment methods": "We accept UPI, credit/debit cards, net banking, and cash on delivery. All payments are secure! 💳",
    "minimum order": "Minimum order quantities vary by seller and material type. Check the 'Min Order' on each listing! 📦",
    "delivery": "Delivery options depend on your location and the seller. You can also book transport through our Transport Partners! 🚛"
  },

  // Account & Profile
  account: {
    "create account": "Click 'Sign Up' on the homepage, choose 'Buyer', fill in your details, and you're ready to start shopping! 🎯",
    "forgot password": "Use the 'Forgot Password' link on the sign-in page to reset your password via email. 🔐",
    "edit profile": "Go to Settings in your dashboard to update your profile information, contact details, and preferences. ⚙️",
    "delete account": "Contact our support team through the help section if you need to delete your account. We're sad to see you go! 😢"
  },

  // Materials & Categories
  materials: {
    "metal scrap": "We have copper, aluminum, steel, and other metal scraps from verified sellers. Check quality ratings before buying! 🔧",
    "plastic waste": "Find HDPE, PET, PP and other clean plastic materials perfect for recycling. All sorted and cleaned! ♻️",
    "e-waste": "Electronic components, circuit boards, and tech materials from certified sources. Great for component recovery! 💻",
    "textile waste": "Cotton, polyester, and mixed fabric waste for recycling into new products. Sustainable fashion starts here! 👕",
    "paper waste": "Clean paper, cardboard, and pulp materials from offices and manufacturers. Perfect for recycling! 📄"
  },

  // Orders & Tracking
  orders: {
    "track order": "Check your 'Orders' tab in the dashboard to see real-time status of all your purchases! 📋",
    "cancel order": "You can cancel orders within 2 hours of placing them. After that, contact the seller directly! ❌",
    "refund policy": "Full refunds available if materials don't match description. We ensure quality or your money back! 💰",
    "order history": "All your past orders are saved in your dashboard. Download invoices anytime you need them! 📊"
  },

  // Pricing & Quality
  quality: {
    "price negotiation": "Many sellers are open to bulk discounts! Use the 'Message Seller' feature to discuss pricing! 💬",
    "quality assurance": "All sellers are rated by buyers. Check ratings, reviews, and photos before purchasing! ⭐",
    "bulk discounts": "Most sellers offer better prices for larger quantities. Look for 'Bulk Available' tags! 📈",
    "price alerts": "Set up price alerts for materials you need. We'll notify you when prices drop! 🔔"
  },

  // Support & Help
  support: {
    "contact support": "Need help? Use the 'Help' section in your dashboard or email us at support@ecopulse.com! 📞",
    "report seller": "Found an issue with a seller? Use 'Report' on their profile to let us know. We take this seriously! 🚨",
    "technical issues": "Having technical problems? Try refreshing the page or clearing your browser cache first! 🔧",
    "feature request": "Have ideas for new features? We'd love to hear them! Send us your suggestions! 💡"
  },

  // Environmental Impact
  environment: {
    "environmental impact": "Every purchase on EcoPulse helps reduce waste and promotes circular economy! You're making a difference! 🌍",
    "sustainability": "We're committed to sustainable practices. All our partners follow eco-friendly processes! 🌱",
    "carbon footprint": "Buying recycled materials reduces carbon footprint by up to 80% compared to new materials! 🌿",
    "waste reduction": "You're helping divert waste from landfills and giving materials a second life! Thank you! ♻️"
  },

  // Default responses
  fallbacks: [
    "I'm not sure about that specific question, but you can check our Help section or contact support for detailed assistance! 🤔",
    "That's a great question! For specific details, I'd recommend reaching out to our support team who can give you the exact information! 📞",
    "I don't have that information right now, but our support team would be happy to help you with that! 💬",
    "Hmm, I might need some help with that one! Try contacting our support team for the best answer! 🆘"
  ]
};

// Smart response matching
export const findBestResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();
  
  // Greetings
  if (message.match(/^(hi|hello|hey|good|greetings)/)) {
    return getRandomResponse(chatBotResponses.greetings);
  }

  // Marketplace queries
  if (message.includes('buy') || message.includes('purchase') || message.includes('order')) {
    if (message.includes('how')) return chatBotResponses.marketplace["how to buy"];
    if (message.includes('minimum') || message.includes('min')) return chatBotResponses.marketplace["minimum order"];
  }

  // Account queries
  if (message.includes('account') || message.includes('profile') || message.includes('sign up')) {
    if (message.includes('create') || message.includes('sign up')) return chatBotResponses.account["create account"];
    if (message.includes('forgot') || message.includes('password')) return chatBotResponses.account["forgot password"];
    if (message.includes('edit') || message.includes('update')) return chatBotResponses.account["edit profile"];
  }

  // Payment queries
  if (message.includes('payment') || message.includes('pay') || message.includes('money')) {
    return chatBotResponses.marketplace["payment methods"];
  }

  // Material specific queries
  if (message.includes('metal') || message.includes('copper') || message.includes('aluminum')) {
    return chatBotResponses.materials["metal scrap"];
  }
  if (message.includes('plastic') || message.includes('hdpe') || message.includes('pet')) {
    return chatBotResponses.materials["plastic waste"];
  }
  if (message.includes('electronic') || message.includes('e-waste') || message.includes('computer')) {
    return chatBotResponses.materials["e-waste"];
  }
  if (message.includes('textile') || message.includes('fabric') || message.includes('cotton')) {
    return chatBotResponses.materials["textile waste"];
  }
  if (message.includes('paper') || message.includes('cardboard')) {
    return chatBotResponses.materials["paper waste"];
  }

  // Order queries
  if (message.includes('track') || message.includes('status')) {
    return chatBotResponses.orders["track order"];
  }
  if (message.includes('cancel')) {
    return chatBotResponses.orders["cancel order"];
  }
  if (message.includes('refund') || message.includes('return')) {
    return chatBotResponses.orders["refund policy"];
  }

  // Quality & pricing
  if (message.includes('price') || message.includes('cost') || message.includes('negotiate')) {
    if (message.includes('negotiate') || message.includes('discount')) return chatBotResponses.quality["price negotiation"];
    return chatBotResponses.quality["bulk discounts"];
  }
  if (message.includes('quality') || message.includes('rating')) {
    return chatBotResponses.quality["quality assurance"];
  }

  // Support queries
  if (message.includes('help') || message.includes('support') || message.includes('contact')) {
    return chatBotResponses.support["contact support"];
  }
  if (message.includes('report') || message.includes('problem') || message.includes('issue')) {
    if (message.includes('seller')) return chatBotResponses.support["report seller"];
    return chatBotResponses.support["technical issues"];
  }

  // Environmental queries
  if (message.includes('environment') || message.includes('green') || message.includes('eco')) {
    return chatBotResponses.environment["environmental impact"];
  }
  if (message.includes('sustainable') || message.includes('sustainability')) {
    return chatBotResponses.environment["sustainability"];
  }
  if (message.includes('carbon') || message.includes('footprint')) {
    return chatBotResponses.environment["carbon footprint"];
  }

  // Delivery queries
  if (message.includes('delivery') || message.includes('shipping') || message.includes('transport')) {
    return chatBotResponses.marketplace["delivery"];
  }

  // Fallback response
  return getRandomResponse(chatBotResponses.fallbacks);
};

// Utility functions
export const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

export const formatMessage = (message, isUser = false) => {
  return {
    text: message,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isUser: isUser,
    id: Date.now() + Math.random()
  };
};

// Quick action buttons
export const quickActions = [
  { text: "How to buy materials?", icon: "🛒" },
  { text: "Payment methods", icon: "💳" },
  { text: "Track my order", icon: "📦" },
  { text: "Contact support", icon: "📞" },
  { text: "Environmental impact", icon: "🌱" },
  { text: "Bulk discounts", icon: "💰" }
];
