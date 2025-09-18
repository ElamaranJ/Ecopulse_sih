import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Package, TrendingUp, DollarSign, MessageCircle, BarChart3, Edit, Trash2, Eye, Upload, Camera, 
  MapPin, Calendar, CheckCircle, Clock, X, User, Star, Recycle, Bell, Settings, LogOut, Search, Filter, 
  Download, FileText, CreditCard, Activity, ArrowLeft
} from 'lucide-react';
import bg from './assets/space.jpg';
import { dataManager } from './utils/dataManager';

const SellerDashboard = () => {
  const navigate = useNavigate();
   const currentUser = JSON.parse(localStorage.getItem('ecopulse_current_user') || 'null');
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddListing, setShowAddListing] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [newListing, setNewListing] = useState({
    title: '', category: '', price: '', quantity: '', description: '', location: '', photos: []
  });
  
  const fileInputRef = useRef(null);
const [listings, setListings] = useState(dataManager.getListingsBySeller(currentUser?.name));

useEffect(() => {
  const unsubscribe = dataManager.subscribe((event, payload) => {
    if (event === 'listing_added' || event === 'listing_updated' || event === 'listing_deleted') {
      setListings(dataManager.getListingsBySeller(currentUser?.name));
    }
  });
  return unsubscribe;
}, [currentUser]);

  // Enhanced background style matching HomePage and SignInPage
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

  // Mock data
  const stats = [
    { label: 'Total Listings', value: '24', icon: Package, color: '#3b82f6', trend: '+12%' },
    { label: 'Orders This Month', value: '18', icon: TrendingUp, color: '#10b981', trend: '+25%' },
    { label: 'Revenue (₹)', value: '45,200', icon: DollarSign, color: '#8b5cf6', trend: '+18%' },
    { label: 'Active Chats', value: '7', icon: MessageCircle, color: '#f59e0b', trend: '+3' }
  ];

  const orders = [
    { id: 1, buyer: 'EcoRecycle Solutions', material: 'Copper Wire Scrap', quantity: '100 kg', price: '₹85,000', status: 'Pending', date: '2025-01-15', location: 'Mumbai, Maharashtra' },
    { id: 2, buyer: 'GreenTech Industries', material: 'HDPE Bottles', quantity: '300 kg', price: '₹13,500', status: 'Accepted', date: '2025-01-14', location: 'Delhi, NCR' },
    { id: 3, buyer: 'Sustainable Materials Co.', material: 'Aluminum Sheets', quantity: '200 kg', price: '₹24,000', status: 'Completed', date: '2025-01-12', location: 'Bangalore, Karnataka' }
  ];

  const messages = [
    { id: 1, buyer: 'EcoRecycle Solutions', message: 'Is the copper wire scrap still available?', time: '2 hours ago', unread: true },
    { id: 2, buyer: 'GreenTech Industries', message: 'Can you provide more photos of the HDPE bottles?', time: '5 hours ago', unread: true },
    { id: 3, buyer: 'Sustainable Materials Co.', message: 'Thank you for the quick delivery!', time: '1 day ago', unread: false }
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
      border: 'none',
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

  // Function to convert file to base64 for storage
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

 const handleAddListing = async () => {
  // Convert photos to base64 if they are File objects
  const photoUrls = await Promise.all(
    newListing.photos.map(async (photo) => {
      if (photo instanceof File) {
        return await fileToBase64(photo);
      }
      return photo; // Already a string/URL
    })
  );

  const listingData = {
    ...newListing,
    seller: currentUser?.name || "Unknown Seller",
    photos: photoUrls,
    image: photoUrls[0] || '/api/placeholder/80/80', // Use first photo as main image
    views: newListing.views || Math.floor(Math.random() * 300) + 50,
    inquiries: newListing.inquiries || Math.floor(Math.random() * 20) + 1,
    status: newListing.status || 'Active'
  };

  if (newListing.id) {
    // Editing existing listing
    dataManager.updateListing(newListing.id, listingData);
  } else {
    // Adding new listing
    dataManager.addListing(listingData);
  }

  setShowAddListing(false);
  setNewListing({ title: '', category: '', price: '', quantity: '', description: '', location: '', photos: [] });
};

const handleEditListing = (id, updates) => {
  dataManager.updateListing(id, updates);
};

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewListing(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index) => {
    setNewListing(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    setShowOrderDetails(null);
  };

  const renderOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={glassCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0' }}>{stat.label}</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>{stat.value}</p>
                  <p style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', margin: '0' }}>{stat.trend}</p>
                </div>
                <div 
                  style={{ 
                    padding: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: `${stat.color}20`, 
                    border: `1px solid ${stat.color}40` 
                  }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div style={glassCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0' }}>Recent Activity</h3>
          <GlassButton variant="secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
            View All
          </GlassButton>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.slice(0, 3).map((order) => (
            <div 
              key={order.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '16px', 
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%',
                    backgroundColor: order.status === 'Completed' ? '#10b981' :
                      order.status === 'Pending' ? '#f59e0b' : '#3b82f6'
                  }}
                ></div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', margin: '0 0 4px 0' }}>{order.material}</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0' }}>{order.buyer} • {order.quantity}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>{order.price}</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: '0' }}>{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div style={{ ...glassCardStyle, textAlign: 'center' }}>
          <Plus style={{ margin: '0 auto 16px auto', color: '#10b981' }} size={32} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>Add New Listing</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 16px 0' }}>List your waste materials for recycling</p>
          <GlassButton onClick={() => setShowAddListing(true)} variant="primary" style={{ width: '100%' }}>
            Create Listing
          </GlassButton>
        </div>

        <div style={{ ...glassCardStyle, textAlign: 'center' }}>
          <BarChart3 style={{ margin: '0 auto 16px auto', color: '#3b82f6' }} size={32} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>View Analytics</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 16px 0' }}>Track your performance and insights</p>
          <GlassButton onClick={() => setActiveTab('analytics')} variant="secondary" style={{ width: '100%' }}>
            View Reports
          </GlassButton>
        </div>

        <div style={{ ...glassCardStyle, textAlign: 'center' }}>
          <MessageCircle style={{ margin: '0 auto 16px auto', color: '#f59e0b' }} size={32} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>Messages</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 16px 0' }}>Communicate with potential buyers</p>
          <GlassButton onClick={() => setActiveTab('messages')} variant="secondary" style={{ width: '100%' }}>
            View Messages
          </GlassButton>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>My Listings</h2>
        <GlassButton onClick={() => setShowAddListing(true)} variant="primary">
          <Plus size={18} />
          Add Listing
        </GlassButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {listings.map((listing) => (
          <div key={listing.id} style={glassCardStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <img 
                src={listing.image || '/api/placeholder/80/80'} 
                alt={listing.title} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '12px', 
                  objectFit: 'cover',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }} 
                onError={(e) => {
                  // Fallback to a default image if the image fails to load
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSIgc3Ryb2tlLXdpZHRoPSIyIj4KPHBhdGggZD0ibTkgMTggMy0zIDMgMyIvPgo8cGF0aCBkPSJtOSA2IDMgMyAzLTMiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPgo8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPgo8cGF0aCBkPSJtMjEgMTUtMy41LTMuNWEyLjIgMi4yIDAgMCAwLTMgMEw5IDEzLjUiLz4KPC9zdmc+Cjwvc3ZnPgo8L3N2Zz4K';
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>{listing.title}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 8px 0' }}>{listing.category}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      <span>₹{listing.price}/kg</span>
                      <span>{listing.quantity} kg available</span>
                      <span 
                        style={{ 
                          padding: '4px 8px', 
                          borderRadius: '20px', 
                          fontSize: '12px',
                          backgroundColor: listing.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                          color: listing.status === 'Active' ? '#10b981' : '#9ca3af',
                          border: `1px solid ${listing.status === 'Active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.3)'}`
                        }}
                      >
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                   <GlassButton 
                    variant="secondary" 
                    style={{ padding: '8px 12px' }}
                    onClick={() => {
                      setNewListing({
                        ...listing,
                        photos: listing.photos || [] // Ensure photos is always an array
                      });
                      setShowAddListing(true);
                    }}
                  >
                    <Edit size={16} />
                  </GlassButton>

                    <GlassButton variant="secondary" style={{ padding: '8px 12px' }}>
                      <Eye size={16} />
                    </GlassButton>
                    <GlassButton variant="danger" style={{ padding: '8px 12px' }}>
                      <Trash2 size={16} />
                    </GlassButton>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '16px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={14} />
                    <span>{listing.views} views</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageCircle size={14} />
                    <span>{listing.inquiries} inquiries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>Order Management</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map((order) => (
          <div key={order.id} style={glassCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0' }}>{order.material}</h3>
                  <span 
                    style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '500',
                      backgroundColor: 
                        order.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' :
                        order.status === 'Pending' ? 'rgba(245, 158, 11, 0.2)' :
                        order.status === 'Accepted' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                      color: 
                        order.status === 'Completed' ? '#10b981' :
                        order.status === 'Pending' ? '#f59e0b' :
                        order.status === 'Accepted' ? '#3b82f6' : '#9ca3af',
                      border: `1px solid ${
                        order.status === 'Completed' ? 'rgba(16, 185, 129, 0.3)' :
                        order.status === 'Pending' ? 'rgba(245, 158, 11, 0.3)' :
                        order.status === 'Accepted' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(107, 114, 128, 0.3)'
                      }`
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 12px 0' }}>Buyer: {order.buyer}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Quantity</p>
                    <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{order.quantity}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Price</p>
                    <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{order.price}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Date</p>
                    <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{order.date}</p>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Location</p>
                    <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{order.location}</p>
                  </div>
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
                {order.status === 'Pending' && (
                  <>
                    <GlassButton 
                      variant="primary" 
                      onClick={() => handleOrderAction(order.id, 'accept')}
                      style={{ padding: '8px 16px', fontSize: '12px' }}
                    >
                      Accept
                    </GlassButton>
                    <GlassButton 
                      variant="danger" 
                      onClick={() => handleOrderAction(order.id, 'reject')}
                      style={{ padding: '8px 16px', fontSize: '12px' }}
                    >
                      Reject
                    </GlassButton>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>Messages</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((message) => (
          <div key={message.id} style={glassCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                {message.unread && (
                  <div 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: '#3b82f6', 
                      borderRadius: '50%', 
                      marginTop: '4px', 
                      flexShrink: 0 
                    }}
                  ></div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0' }}>{message.buyer}</h3>
                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>{message.time}</span>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', lineHeight: '1.5' }}>{message.message}</p>
                </div>
              </div>
              <GlassButton variant="secondary" style={{ padding: '8px 16px', fontSize: '12px', marginLeft: '16px' }}>
                Reply
              </GlassButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>Analytics & Reports</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={glassCardStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>Performance Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Revenue</span>
              <span style={{ color: 'white', fontWeight: '600' }}>₹45,200</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Listings</span>
              <span style={{ color: 'white', fontWeight: '600' }}>18</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Conversion Rate</span>
              <span style={{ color: 'white', fontWeight: '600' }}>12.5%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Average Rating</span>
              <span style={{ color: 'white', fontWeight: '600' }}>4.8/5</span>
            </div>
          </div>
        </div>

        <div style={glassCardStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>Recent Trends</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Views This Month</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>+25%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Orders This Month</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>+18%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>New Inquiries</span>
              <span style={{ color: '#3b82f6', fontWeight: '600' }}>+12%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Repeat Customers</span>
              <span style={{ color: '#8b5cf6', fontWeight: '600' }}>+8%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>Export Options</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <GlassButton variant="secondary">
            <Download size={16} />
            Export Sales Report
          </GlassButton>
          <GlassButton variant="secondary">
            <FileText size={16} />
            Download Invoice
          </GlassButton>
          <GlassButton variant="secondary">
            <BarChart3 size={16} />
            Analytics Report
          </GlassButton>
        </div>
      </div>
    </div>
  );

  const renderAddListingModal = () => (
    showAddListing && (
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
        <div style={{ ...glassCardStyle, maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
              {newListing.id ? 'Edit Listing' : 'Add New Listing'}
            </h2>
            <button
              onClick={() => {
                setShowAddListing(false);
                setNewListing({ title: '', category: '', price: '', quantity: '', description: '', location: '', photos: [] });
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255, 255, 255, 0.6)', 
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'color 0.3s ease'
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Title</label>
              <input
                type="text"
                value={newListing.title}
                onChange={(e) => setNewListing(prev => ({ ...prev, title: e.target.value }))}
                style={inputStyle}
                placeholder="Enter listing title"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Category</label>
                <select
                  value={newListing.category}
                  onChange={(e) => setNewListing(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'rgba(255,255,255,0.8)\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '12px',
                    paddingRight: '40px',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>Select category</option>
                  <option value="Metal Scrap" style={{ backgroundColor: '#1f2937', color: 'white' }}>Metal Scrap</option>
                  <option value="Plastic Waste" style={{ backgroundColor: '#1f2937', color: 'white' }}>Plastic Waste</option>
                  <option value="Paper Waste" style={{ backgroundColor: '#1f2937', color: 'white' }}>Paper Waste</option>
                  <option value="Electronic Waste" style={{ backgroundColor: '#1f2937', color: 'white' }}>Electronic Waste</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Price (₹/kg)</label>
                <input
                  type="number"
                  value={newListing.price}
                  onChange={(e) => setNewListing(prev => ({ ...prev, price: e.target.value }))}
                  style={inputStyle}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Quantity (kg)</label>
              <input
                type="number"
                value={newListing.quantity}
                onChange={(e) => setNewListing(prev => ({ ...prev, quantity: e.target.value }))}
                style={inputStyle}
                placeholder="Enter available quantity"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Location</label>
              <input
                type="text"
                value={newListing.location}
                onChange={(e) => setNewListing(prev => ({ ...prev, location: e.target.value }))}
                style={inputStyle}
                placeholder="Enter location"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Description</label>
              <textarea
                value={newListing.description}
                onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
                placeholder="Describe your waste material..."
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Photos</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ 
                  border: '2px dashed rgba(255, 255, 255, 0.4)', 
                  borderRadius: '12px', 
                  padding: '24px', 
                  textAlign: 'center', 
                  cursor: 'pointer', 
                  transition: 'border-color 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)' 
                }}
              >
                <Camera style={{ margin: '0 auto 8px auto', color: 'rgba(255, 255, 255, 0.6)' }} size={32} />
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 4px 0' }}>Click to upload photos</p>
                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', margin: '0' }}>PNG, JPG up to 10MB each</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              
              {newListing.photos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
                  {newListing.photos.map((photo, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img 
                        src={photo instanceof File ? URL.createObjectURL(photo) : photo} 
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100%', height: '96px', objectFit: 'cover', borderRadius: '12px' }}
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        style={{ 
                          position: 'absolute', 
                          top: '4px', 
                          right: '4px', 
                          backgroundColor: '#ef4444', 
                          color: 'white', 
                          borderRadius: '50%', 
                          padding: '4px', 
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
              <GlassButton onClick={handleAddListing} variant="primary" style={{ flex: 1 }}>
                {newListing.id ? 'Update Listing' : 'Create Listing'}
              </GlassButton>
              <GlassButton 
                onClick={() => {
                  setShowAddListing(false);
                  setNewListing({ title: '', category: '', price: '', quantity: '', description: '', location: '', photos: [] });
                }} 
                variant="secondary" 
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

  const renderOrderDetailsModal = () => (
    showOrderDetails && (
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
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>Order Details</h2>
            <button
              onClick={() => setShowOrderDetails(null)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255, 255, 255, 0.6)', 
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'color 0.3s ease'
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Material</p>
                <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{showOrderDetails.material}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Buyer</p>
                <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{showOrderDetails.buyer}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Quantity</p>
                <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{showOrderDetails.quantity}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Price</p>
                <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{showOrderDetails.price}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Location</p>
                <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{showOrderDetails.location}</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Date</p>
                <p style={{ color: 'white', fontWeight: '500', margin: '0' }}>{showOrderDetails.date}</p>
              </div>
            </div>

            {showOrderDetails.status === 'Pending' && (
              <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
                <GlassButton 
                  onClick={() => handleOrderAction(showOrderDetails.id, 'accept')} 
                  variant="primary" 
                  style={{ flex: 1 }}
                >
                  Accept Order
                </GlassButton>
                <GlassButton 
                  onClick={() => handleOrderAction(showOrderDetails.id, 'reject')} 
                  variant="danger" 
                  style={{ flex: 1 }}
                >
                  Reject Order
                </GlassButton>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );

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
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(0px)';
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
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
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>Seller Dashboard</p>
          </div>

          {/* User Info */}
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
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'listings', label: 'My Listings', icon: Package },
              { id: 'orders', label: 'Orders', icon: CheckCircle },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'listings' && renderListings()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'analytics' && renderAnalytics()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderAddListingModal()}
      {renderOrderDetailsModal()}
    </div>
  );
};

export default SellerDashboard;