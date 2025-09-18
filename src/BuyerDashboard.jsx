import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, ShoppingCart, Package, CreditCard, Heart, Star, MapPin, ArrowLeft, 
  Plus, Eye, MessageCircle, Calendar, Clock, CheckCircle, X, User, Recycle, Bell, 
  Settings, LogOut, Download, FileText, TrendingUp, DollarSign, Bookmark, StarIcon,
  Edit, Trash2, Send, PlusCircle, ShoppingBag
} from 'lucide-react';
import bg from './assets/space.jpg';
import { dataManager } from './utils/dataManager';
import ChatBot from './components/ChatBot/ChatBot';
import ChatBotButton from './components/ChatBot/ChatBotButton';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('ecopulse_current_user') || 'null');
  const [activeTab, setActiveTab] = useState('marketplace');
  const [cartItems, setCartItems] = useState([]);
  const [savedSuppliers, setSavedSuppliers] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: '', priceRange: '', location: '' });
  const [newRequest, setNewRequest] = useState({
    material: '', quantity: '', maxPrice: '', location: '', description: '', urgency: 'normal'
  });
  const [marketplaceItems, setMarketplaceItems] = useState(dataManager.getAllListings());
const [chatBotOpen, setChatBotOpen] = useState(false);
const [chatUnreadCount, setChatUnreadCount] = useState(0);
  useEffect(() => {
    const unsubscribe = dataManager.subscribe((event, payload) => {
      if (event === 'listing_added' || event === 'listing_updated' || event === 'listing_deleted') {
        setMarketplaceItems(dataManager.getAllListings());
      }
    });
    return unsubscribe;
  }, []);

  // Enhanced background style matching other pages
  const backgroundStyle = {
    minHeight: "100vh",
    background: `
      linear-gradient(135deg, rgba(74, 144, 226, 0.3) 0%, rgba(155, 81, 224, 0.3) 100%), 
      url(${bg}) center/cover,
      linear-gradient(45deg, #667eea 0%, #764ba2 100%)
    `,
    backgroundAttachment: "fixed",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  // Enhanced glassmorphism card style
  const glassCardStyle = {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    color: 'white'
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: "16px",
    outline: "none",
    fontSize: "15px",
    fontWeight: "500",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  // Mock data with product images using placeholder URLs
//   const marketplaceItems = [
//     {
//       id: 1,
//       title: 'Premium Copper Wire Scrap',
//       seller: 'MetalCorp Industries',
//       price: 850,
//       quantity: 500,
//       location: 'Mumbai, Maharashtra',
//       category: 'Metal Scrap',
//       rating: 4.8,
//       reviews: 124,
//       image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
//       description: 'High-quality copper wire scrap, 99% pure, suitable for recycling and manufacturing.',
//       minOrder: 50
//     },
//     {
//       id: 2,
//       title: 'Clean HDPE Plastic Bottles',
//       seller: 'EcoPlastic Solutions',
//       price: 45,
//       quantity: 2000,
//       location: 'Delhi, NCR',
//       category: 'Plastic Waste',
//       rating: 4.6,
//       reviews: 89,
//       image: 'https://images.unsplash.com/photo-1572776685600-aca8c3456337?w=300&h=200&fit=crop',
//       description: 'Cleaned and sorted HDPE bottles, ready for recycling processes.',
//       minOrder: 100
//     },
//     {
//       id: 3,
//       title: 'Aluminum Scrap Sheets',
//       seller: 'Sustainable Materials Co.',
//       price: 120,
//       quantity: 800,
//       location: 'Bangalore, Karnataka',
//       category: 'Metal Scrap',
//       rating: 4.9,
//       reviews: 156,
//       image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop',
//       description: 'High-grade aluminum scrap sheets from manufacturing waste.',
//       minOrder: 25
//     },
//     {
//       id: 4,
//       title: 'Cotton Textile Waste',
//       seller: 'TextileGreen Recyclers',
//       price: 35,
//       quantity: 1500,
//       location: 'Tirupur, Tamil Nadu',
//       category: 'Textile Waste',
//       rating: 4.7,
//       reviews: 203,
//       image: 'https://images.unsplash.com/photo-1586295166440-e8fabb7e9456?w=300&h=200&fit=crop',
//       description: 'Pure cotton textile waste from garment manufacturing.',
//       minOrder: 200
//     },
//     {
//       id: 5,
//       title: 'Electronic Component Scrap',
//       seller: 'TechRecycle Hub',
//       price: 2500,
//       quantity: 150,
//       location: 'Pune, Maharashtra',
//       category: 'E-Waste',
//       rating: 4.5,
//       reviews: 67,
//       image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
//       description: 'Various electronic components and circuit boards for precious metal recovery.',
//       minOrder: 5
//     },
//     {
//       id: 6,
//       title: 'Paper Waste Bundles',
//       seller: 'PaperCycle Industries',
//       price: 18,
//       quantity: 3000,
//       location: 'Chennai, Tamil Nadu',
//       category: 'Paper Waste',
//       rating: 4.4,
//       reviews: 91,
//       image: 'https://images.unsplash.com/photo-1594736797933-d0951ba1bb8c?w=300&h=200&fit=crop',
//       description: 'Mixed paper waste bundles, sorted and compressed for easy transport.',
//       minOrder: 500
//     }
//   ];

  const myOrders = [
    {
      id: 1,
      material: 'Copper Wire Scrap',
      seller: 'MetalCorp Industries',
      quantity: '200 kg',
      price: '₹1,70,000',
      status: 'Delivered',
      orderDate: '2025-01-10',
      deliveryDate: '2025-01-15',
      trackingId: 'ECO123456789'
    },
    {
      id: 2,
      material: 'HDPE Bottles',
      seller: 'EcoPlastic Solutions',
      quantity: '500 kg',
      price: '₹22,500',
      status: 'In Transit',
      orderDate: '2025-01-14',
      expectedDelivery: '2025-01-18',
      trackingId: 'ECO987654321'
    },
    {
      id: 3,
      material: 'Aluminum Sheets',
      seller: 'Sustainable Materials Co.',
      quantity: '100 kg',
      price: '₹12,000',
      status: 'Processing',
      orderDate: '2025-01-16',
      expectedDelivery: '2025-01-20',
      trackingId: 'ECO456789123'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      invoice: 'INV-2025-001',
      amount: '₹1,70,000',
      date: '2025-01-15',
      method: 'Bank Transfer',
      status: 'Paid',
      material: 'Copper Wire Scrap'
    },
    {
      id: 2,
      invoice: 'INV-2025-002',
      amount: '₹22,500',
      date: '2025-01-14',
      method: 'UPI',
      status: 'Paid',
      material: 'HDPE Bottles'
    },
    {
      id: 3,
      invoice: 'INV-2025-003',
      amount: '₹12,000',
      date: '2025-01-16',
      method: 'Credit Card',
      status: 'Processing',
      material: 'Aluminum Sheets'
    }
  ];

  const GlassButton = ({ children, onClick, variant = 'primary', disabled = false, style = {} }) => {
    const baseStyle = {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      padding: '12px 20px',
      color: 'white',
      fontWeight: '600',
      fontSize: '14px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      opacity: disabled ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      background: 'transparent',
      ...style
    };

    const variantStyles = {
      primary: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        border: '1px solid rgba(16, 185, 129, 0.4)'
      },
      secondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      },
      danger: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        border: '1px solid rgba(239, 68, 68, 0.4)'
      },
      cart: {
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.4)'
      }
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{ ...baseStyle, ...variantStyles[variant] }}
      >
        {children}
      </button>
    );
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.minOrder }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: item.minOrder }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const addToSavedSuppliers = (seller) => {
    if (!savedSuppliers.includes(seller)) {
      setSavedSuppliers([...savedSuppliers, seller]);
    }
  };

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesLocation = !filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const renderMarketplace = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search and Filters */}
      <div style={glassCardStyle}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'rgba(255, 255, 255, 0.6)' 
              }} 
            />
            <input
              type="text"
              placeholder="Search materials, sellers, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                ...inputStyle, 
                paddingLeft: '48px', 
                marginBottom: '0' 
              }}
            />
          </div>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            style={{ ...inputStyle, marginBottom: '0', minWidth: '150px' }}
          >
            <option value="">All Categories</option>
            <option value="Metal Scrap">Metal Scrap</option>
            <option value="Plastic Waste">Plastic Waste</option>
            <option value="Paper Waste">Paper Waste</option>
            <option value="E-Waste">E-Waste</option>
            <option value="Textile Waste">Textile Waste</option>
          </select>
          
          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            style={{ ...inputStyle, marginBottom: '0', minWidth: '150px' }}
          />
          
          <GlassButton variant="secondary">
            <Filter size={16} />
            Filter
          </GlassButton>
        </div>
      </div>

      {/* Marketplace Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {filteredItems.map((item) => (
          <div key={item.id} style={glassCardStyle}>
            <img 
              src={item.image} 
              alt={item.title}
              style={{ 
                width: '100%', 
                height: '200px', 
                borderRadius: '12px', 
                objectFit: 'cover', 
                marginBottom: '16px' 
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '14px' }}>
                  by {item.seller}
                </p>
              </div>
              <GlassButton 
                variant="secondary" 
                onClick={() => addToSavedSuppliers(item.seller)}
                style={{ padding: '8px' }}
              >
                <Heart size={16} />
              </GlassButton>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                  {item.rating}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  ({item.reviews} reviews)
                </span>
              </div>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '0 0 16px 0', lineHeight: '1.4' }}>
              {item.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Price:</span>
                <p style={{ color: 'white', fontWeight: '600', margin: '4px 0 0 0' }}>₹{item.price}/kg</p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Available:</span>
                <p style={{ color: 'white', fontWeight: '600', margin: '4px 0 0 0' }}>{item.quantity} kg</p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Location:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} />
                  {item.location}
                </p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Min Order:</span>
                <p style={{ color: 'white', fontWeight: '600', margin: '4px 0 0 0' }}>{item.minOrder} kg</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <GlassButton 
                variant="cart" 
                onClick={() => addToCart(item)}
                style={{ flex: 1 }}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </GlassButton>
              <GlassButton variant="secondary" style={{ padding: '12px' }}>
                <Eye size={16} />
              </GlassButton>
              <GlassButton variant="secondary" style={{ padding: '12px' }}>
                <MessageCircle size={16} />
              </GlassButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRequestMaterials = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
          Material Requests
        </h2>
        <GlassButton onClick={() => setShowRequestModal(true)} variant="primary">
          <Plus size={18} />
          New Request
        </GlassButton>
      </div>

      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
          How Material Requests Work
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(59, 130, 246, 0.2)', 
              border: '1px solid rgba(59, 130, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <Send size={24} style={{ color: '#3b82f6' }} />
            </div>
            <h4 style={{ color: 'white', margin: '0 0 8px 0' }}>1. Post Request</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0' }}>
              Specify the materials you need with quantity and budget
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(16, 185, 129, 0.2)', 
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <MessageCircle size={24} style={{ color: '#10b981' }} />
            </div>
            <h4 style={{ color: 'white', margin: '0 0 8px 0' }}>2. Get Offers</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0' }}>
              Sellers respond with quotes and availability
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(245, 158, 11, 0.2)', 
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <CheckCircle size={24} style={{ color: '#f59e0b' }} />
            </div>
            <h4 style={{ color: 'white', margin: '0 0 8px 0' }}>3. Choose & Buy</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0' }}>
              Select the best offer and complete your purchase
            </p>
          </div>
        </div>
      </div>

      {/* Active Requests */}
      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
          Your Active Requests
        </h3>
        <div style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '40px' }}>
          <Send size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
          <p>No active material requests</p>
          <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>
            Post a request to get custom quotes from suppliers
          </p>
        </div>
      </div>
    </div>
  );

  const renderMyOrders = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        My Orders
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {myOrders.map((order) => (
          <div key={order.id} style={glassCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0' }}>
                    {order.material}
                  </h3>
                  <span 
                    style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '500',
                      backgroundColor: 
                        order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.2)' :
                        order.status === 'In Transit' ? 'rgba(59, 130, 246, 0.2)' :
                        'rgba(245, 158, 11, 0.2)',
                      color: 
                        order.status === 'Delivered' ? '#10b981' :
                        order.status === 'In Transit' ? '#3b82f6' :
                        '#f59e0b',
                      border: `1px solid ${
                        order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.3)' :
                        order.status === 'In Transit' ? 'rgba(59, 130, 246, 0.3)' :
                        'rgba(245, 158, 11, 0.3)'
                      }`
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 12px 0' }}>
                  Seller: {order.seller}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Quantity:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{order.quantity}</p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total Price:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{order.price}</p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Order Date:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{order.orderDate}</p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {order.status === 'Delivered' ? 'Delivered On:' : 'Expected:'}
                    </span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>
                      {order.deliveryDate || order.expectedDelivery}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>Tracking ID: </span>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: '500' }}>{order.trackingId}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                <GlassButton 
                  variant="secondary" 
                  onClick={() => setShowOrderDetails(order)}
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  View Details
                </GlassButton>
                {order.status === 'Delivered' && (
                  <GlassButton 
                    variant="primary" 
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    Rate Seller
                  </GlassButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentInvoices = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        Payment & Invoices
      </h2>

      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
          Payment History
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {paymentHistory.map((payment) => (
            <div 
              key={payment.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div>
                <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {payment.material}
                </h4>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Invoice: {payment.invoice}
                  </span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {payment.date}
                  </span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {payment.method}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                    {payment.amount}
                  </p>
                  <span 
                    style={{ 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      backgroundColor: payment.status === 'Paid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: payment.status === 'Paid' ? '#10b981' : '#f59e0b',
                      border: `1px solid ${payment.status === 'Paid' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}
                  >
                    {payment.status}
                  </span>
                </div>
                
                <GlassButton variant="secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
                  <Download size={14} />
                  Download
                </GlassButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSavedSuppliers = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        Saved Suppliers
      </h2>

      <div style={glassCardStyle}>
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.7)' }}>
          <Heart size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
          <p>No saved suppliers yet</p>
          <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>
            Browse the marketplace and save your favorite suppliers for easy access
          </p>
        </div>
      </div>
    </div>
  );

  const renderRatingReview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        Rating & Reviews
      </h2>

      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
          Pending Reviews
        </h3>
        
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.7)' }}>
          <Star size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
          <p>No pending reviews</p>
          <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>
            Complete orders to rate and review your sellers
          </p>
        </div>
      </div>
    </div>
  );

  // Shopping Cart Modal
  const renderCartModal = () => (
    showCartModal && (
      <div 
        style={{ 
          position: 'fixed', 
          inset: '0', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '16px', 
          zIndex: 1000,
          backdropFilter: 'blur(8px)' 
        }}
      >
        <div style={{ ...glassCardStyle, maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={() => setShowCartModal(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255, 255, 255, 0.6)', 
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <ShoppingCart size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    style={{ 
                      display: 'flex', 
                      gap: '16px', 
                      padding: '16px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                      borderRadius: '12px' 
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'white', margin: '0 0 4px 0' }}>{item.title}</h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 8px 0' }}>
                        by {item.seller}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'white', fontWeight: '600' }}>
                          ₹{item.price}/kg × {item.quantity}kg
                        </span>
                        <span style={{ color: 'white', fontWeight: '600' }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <GlassButton 
                      variant="danger" 
                      onClick={() => removeFromCart(item.id)}
                      style={{ padding: '8px' }}
                    >
                      <Trash2 size={16} />
                    </GlassButton>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '12px', 
                marginBottom: '24px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>Total:</span>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                    ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <GlassButton variant="secondary" style={{ flex: 1 }} onClick={() => setShowCartModal(false)}>
                  Continue Shopping
                </GlassButton>
               <GlassButton 
  variant="primary" 
  style={{ flex: 1 }}
  onClick={() => {
    navigate('/checkout');
    setShowCartModal(false);
  }}
>
  Proceed to Checkout
</GlassButton>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );

  // Request Material Modal
  const renderRequestModal = () => (
    showRequestModal && (
      <div 
        style={{ 
          position: 'fixed', 
          inset: '0', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '16px', 
          zIndex: 1000,
          backdropFilter: 'blur(8px)' 
        }}
      >
        <div style={{ ...glassCardStyle, maxWidth: '500px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
              Request Materials
            </h2>
            <button
              onClick={() => setShowRequestModal(false)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255, 255, 255, 0.6)', 
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Material Type *
              </label>
              <input
                type="text"
                placeholder="e.g., Copper wire scrap, HDPE bottles..."
                value={newRequest.material}
                onChange={(e) => setNewRequest(prev => ({ ...prev, material: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Quantity (kg) *
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={newRequest.quantity}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Max Price (₹/kg)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newRequest.maxPrice}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, maxPrice: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Preferred Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={newRequest.location}
                onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Description & Requirements
              </label>
              <textarea
                placeholder="Specify quality requirements, packaging, delivery preferences..."
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Urgency
              </label>
              <select
                value={newRequest.urgency}
                onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                style={inputStyle}
              >
                <option value="normal">Normal (7-14 days)</option>
                <option value="urgent">Urgent (2-7 days)</option>
                <option value="immediate">Immediate (1-2 days)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
              <GlassButton 
                variant="primary" 
                onClick={() => {
                  console.log('Submitting request:', newRequest);
                  setShowRequestModal(false);
                  setNewRequest({ material: '', quantity: '', maxPrice: '', location: '', description: '', urgency: 'normal' });
                }}
                style={{ flex: 1 }}
              >
                Post Request
              </GlassButton>
              <GlassButton 
                variant="secondary" 
                onClick={() => setShowRequestModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
const toggleChatBot = () => {
  setChatBotOpen(!chatBotOpen);
  if (chatUnreadCount > 0) {
    setChatUnreadCount(0);
  }
};

  return (
    <div style={backgroundStyle}>
      {/* Fixed Back Button */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '20px', 
        zIndex: 1001,
        pointerEvents: 'none'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Shopping Cart Button */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: 1001 
      }}>
        <GlassButton 
          variant="cart" 
          onClick={() => setShowCartModal(true)}
          style={{ position: 'relative' }}
        >
          <ShoppingCart size={18} />
          Cart ({cartItems.length})
          {cartItems.length > 0 && (
            <span 
              style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px', 
                backgroundColor: '#ef4444', 
                color: 'white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                fontSize: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {cartItems.length}
            </span>
          )}
        </GlassButton>
      </div>
      
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div 
          style={{ 
            width: '280px', 
            padding: '24px',
            ...glassCardStyle,
            margin: '20px 0 20px 20px',
            borderRadius: '20px',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Recycle style={{ color: '#10b981' }} size={32} />
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>EcoPulse</h1>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>Buyer Dashboard</p>
          </div>
<div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <User size={20} style={{ color: '#10b981' }} />
    <span style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
      {currentUser?.name || 'User'}
    </span>
  </div>
  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', margin: '0' }}>
    {currentUser?.email}
  </p>
</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'marketplace', label: 'Browse Marketplace', icon: Search },
              { id: 'requests', label: 'Request Materials', icon: PlusCircle },
              { id: 'orders', label: 'My Orders', icon: Package },
              { id: 'payments', label: 'Payment & Invoices', icon: CreditCard },
              { id: 'suppliers', label: 'Saved Suppliers', icon: Bookmark },
              { id: 'ratings', label: 'Rating & Review', icon: Star },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: activeTab === item.id 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    color: activeTab === item.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '500',
                    fontSize: '14px',
                    ...(activeTab === item.id && {
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    })
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
              <button 
                onClick={() => navigate('/')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {activeTab === 'marketplace' && renderMarketplace()}
            {activeTab === 'requests' && renderRequestMaterials()}
            {activeTab === 'orders' && renderMyOrders()}
            {activeTab === 'payments' && renderPaymentInvoices()}
            {activeTab === 'suppliers' && renderSavedSuppliers()}
            {activeTab === 'ratings' && renderRatingReview()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderCartModal()}
      {renderRequestModal()}
      <ChatBotButton 
        isOpen={chatBotOpen} 
        onClick={toggleChatBot}
        unreadCount={chatUnreadCount}
      />
      <ChatBot 
        isOpen={chatBotOpen} 
        onClose={() => setChatBotOpen(false)}
      />
    </div>
  );
};

export default BuyerDashboard;
