import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, MapPin, Star, Phone, Mail, Package, Recycle, Leaf, Users, TrendingUp, CheckCircle, ChevronDown, ArrowRight, Zap, Globe, Award, Shield, BarChart3, Sparkles, Timer, Gavel, IndianRupee, Eye, Heart, MessageCircle, Calendar, Truck, Factory, UserCheck } from 'lucide-react';
import bg from './assets/space.jpg';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from "react-router-dom";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSeller, setSelectedSeller] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [showAuctions, setShowAuctions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPricePredictor, setShowPricePredictor] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [watchedItems, setWatchedItems] = useState([]);
  const navigate = useNavigate();

  // Trust badges configuration
  const trustBadges = {
    verified: { icon: Shield, color: '#10b981', label: 'Verified Recycler' },
    ecoPartner: { icon: Leaf, color: '#059669', label: 'Eco-friendly Partner' },
    premium: { icon: Star, color: '#f59e0b', label: 'Premium Seller' },
    trusted: { icon: Award, color: '#8b5cf6', label: 'Trusted Partner' },
    certified: { icon: CheckCircle, color: '#3b82f6', label: 'ISO Certified' }
  };

  // Enhanced categories
  const categories = [
    { id: 'all', name: 'All Categories', icon: Sparkles, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', count: '2.5k+' },
    { id: 'metal', name: 'Metal Scrap', icon: Package, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', count: '850+' },
    { id: 'plastic', name: 'Plastic Waste', icon: Recycle, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', count: '1.2k+' },
    { id: 'textile', name: 'Textile Waste', icon: Package, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', count: '650+' },
    { id: 'ewaste', name: 'E-Waste', icon: Zap, color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', count: '420+' },
    { id: 'paper', name: 'Paper & Cardboard', icon: Package, color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', count: '980+' }
  ];

  // Enhanced listings with trust badges, auction info, and AI pricing
  const listings = [
    { 
      id: 1, 
      title: 'Premium Copper Wire Scrap', 
      seller: 'GreenTech Industries', 
      location: 'Mumbai, Maharashtra', 
      lat: 19.0760, 
      lng: 72.8777, 
      category: 'metal',
      categoryDisplay: 'Metal Scrap',
      description: 'High-grade copper wire scrap, 99% pure, suitable for recycling into new electrical components.',
      price: 'Starting at ₹650/kg',
      aiPrice: { min: 620, max: 680, fair: 650 },
      quantity: '500 kg',
      badges: ['verified', 'ecoPartner'],
      rating: 4.8,
      reviews: 124,
      isAuction: false,
      deliveryTime: '2-3 days',
      minOrder: '50 kg'
    },
    { 
      id: 2, 
      title: 'Clean HDPE Plastic Bottles', 
      seller: 'EcoRecycle Solutions', 
      location: 'Delhi, NCR', 
      lat: 28.7041, 
      lng: 77.1025, 
      category: 'plastic',
      categoryDisplay: 'Plastic Waste',
      description: 'Pre-sorted HDPE bottles, clean and ready for processing into new plastic products.',
      price: 'Auction - Current Bid: ₹42/kg',
      aiPrice: { min: 38, max: 48, fair: 43 },
      quantity: '2000 kg',
      badges: ['verified', 'trusted'],
      rating: 4.6,
      reviews: 89,
      isAuction: true,
      auctionEnd: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      currentBid: 42,
      minBid: 40,
      totalBids: 12,
      deliveryTime: '1-2 days',
      minOrder: '100 kg'
    },
    { 
      id: 3, 
      title: 'Organic Cotton Textile Waste', 
      seller: 'Sustainable Fabric Mills', 
      location: 'Coimbatore, Tamil Nadu', 
      lat: 11.0168, 
      lng: 76.9558, 
      category: 'textile',
      categoryDisplay: 'Textile Waste',
      description: '100% organic cotton textile waste from garment manufacturing, perfect for upcycling.',
      price: '₹25/kg',
      aiPrice: { min: 22, max: 28, fair: 25 },
      quantity: '1500 kg',
      badges: ['ecoPartner', 'certified'],
      rating: 4.9,
      reviews: 67,
      isAuction: false,
      deliveryTime: '3-4 days',
      minOrder: '200 kg'
    },
    { 
      id: 4, 
      title: 'High-Value Computer Components', 
      seller: 'TechCycle Solutions', 
      location: 'Bangalore, Karnataka', 
      lat: 12.9716, 
      lng: 77.5946, 
      category: 'ewaste',
      categoryDisplay: 'E-Waste',
      description: 'Various computer components including motherboards, RAM, and processors for precious metal recovery.',
      price: 'Auction - Current Bid: ₹1,250/kg',
      aiPrice: { min: 1100, max: 1400, fair: 1250 },
      quantity: '50 kg',
      badges: ['verified', 'premium', 'certified'],
      rating: 5.0,
      reviews: 156,
      isAuction: true,
      auctionEnd: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      currentBid: 1250,
      minBid: 1200,
      totalBids: 23,
      deliveryTime: '1 day',
      minOrder: '5 kg'
    },
    { 
      id: 5, 
      title: 'Aluminium Scrap Sheets', 
      seller: 'MetalWorks Pvt Ltd', 
      location: 'Ahmedabad, Gujarat', 
      lat: 23.0225, 
      lng: 72.5714, 
      category: 'metal',
      categoryDisplay: 'Metal Scrap',
      description: 'Clean aluminium sheets from construction and manufacturing, ideal for melting and reprocessing.',
      price: '₹180/kg',
      aiPrice: { min: 175, max: 190, fair: 182 },
      quantity: '800 kg',
      badges: ['trusted', 'verified'],
      rating: 4.7,
      reviews: 93,
      isAuction: false,
      deliveryTime: '2-3 days',
      minOrder: '100 kg'
    }
  ];

  // Unique locations and sellers for filters
  const locations = [...new Set(listings.map(item => item.location))];
  const sellers = [...new Set(listings.map(item => item.seller))];

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || listing.location === selectedLocation;
    const matchesSeller = selectedSeller === 'all' || listing.seller === selectedSeller;
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuction = showAuctions ? listing.isAuction : true;
    
    return matchesCategory && matchesLocation && matchesSeller && matchesSearch && matchesAuction;
  });

  // Glass components
  const GlassCard = ({ children, className = '', onClick = null }) => (
    <div
      className={`glass-card ${className}`}
      onClick={onClick}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
      }}
    >
      {children}
    </div>
  );

  const GlassButton = ({ children, isActive = false, onClick, className = '', variant = 'default' }) => {
    const getButtonStyles = () => {
      const baseStyles = {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '12px',
        padding: '10px 20px',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        outline: 'none',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      };

      if (variant === 'primary') {
        return {
          ...baseStyles,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#10f7b5',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)'
        };
      }

      if (variant === 'danger') {
        return {
          ...baseStyles,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#fca5a5',
          boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)'
        };
      }

      return {
        ...baseStyles,
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
        border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
        color: isActive ? '#1d4ed8' : 'rgba(255, 255, 255, 0.9)',
        boxShadow: isActive
          ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      };
    };

    return (
      <button
        onClick={onClick}
        className={className}
        style={getButtonStyles()}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          } else if (variant === 'danger') {
            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          } else if (!isActive) {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'primary') {
            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
            e.target.style.transform = 'translateY(0)';
          } else if (variant === 'danger') {
            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            e.target.style.transform = 'translateY(0)';
          } else if (!isActive) {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        {children}
      </button>
    );
  };

  // Trust badge component
  const TrustBadge = ({ badge }) => {
    const config = trustBadges[badge];
    if (!config) return null;
    const IconComponent = config.icon;
    
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: `${config.color}20`,
          border: `1px solid ${config.color}40`,
          borderRadius: '8px',
          padding: '4px 8px',
          fontSize: '10px',
          color: config.color,
          fontWeight: '600'
        }}
      >
        <IconComponent size={12} />
        {config.label}
      </div>
    );
  };

  // Auction countdown timer
  const AuctionTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime.getTime() - now;

        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft('Auction ended');
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [endTime]);

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#f59e0b',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        <Timer size={14} />
        {timeLeft}
      </div>
    );
  };

  // AI Price Predictor Modal
  const PricePredictorModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}>
        <GlassCard style={{ maxWidth: '500px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
              AI Price Analysis
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>{item.title}</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
              Based on historical data, current market demand, and location factors
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: '600' }}>
                ₹{item.aiPrice.min}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                Low Range
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#10b981', fontSize: '1.4rem', fontWeight: '700' }}>
                ₹{item.aiPrice.fair}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                Fair Price
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: '600' }}>
                ₹{item.aiPrice.max}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                High Range
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
              💡 AI Recommendation
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
              The current asking price of {item.price} is within the fair range. 
              This is a good deal based on current market conditions.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <GlassButton onClick={onClose}>
              Close
            </GlassButton>
            <GlassButton variant="primary">
              Contact Seller
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    );
  };

  // Bidding Modal
  const BiddingModal = ({ item, onClose }) => {
    if (!item || !item.isAuction) return null;

    const handleBid = () => {
      const bid = parseFloat(bidAmount);
      if (bid > item.currentBid) {
        alert(`Bid of ₹${bid}/kg placed successfully!`);
        setBidAmount('');
        onClose();
      } else {
        alert(`Bid must be higher than current bid of ₹${item.currentBid}/kg`);
      }
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}>
        <GlassCard style={{ maxWidth: '500px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
              Place Bid
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>{item.title}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Current Bid:</span>
              <span style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: '600' }}>
                ₹{item.currentBid}/kg
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Bids:</span>
              <span style={{ color: 'white' }}>{item.totalBids}</span>
            </div>
            <AuctionTimer endTime={item.auctionEnd} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'white', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Your Bid (₹/kg)
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={item.currentBid + 1}
              step="0.01"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder={`Minimum: ₹${(item.currentBid + 1).toFixed(2)}`}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <GlassButton onClick={onClose}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={handleBid}>
              Place Bid
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    );
  };

  // Custom marker for map
  const createCustomIcon = (seller, category) => {
    return L.divIcon({
      html: `
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 2px solid white;
          border-radius: 8px;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: bold;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          white-space: nowrap;
          min-width: 80px;
          text-align: center;
        ">
          ${seller}<br/>
          <span style="font-size: 8px; opacity: 0.9;">${category}</span>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [100, 30],
      iconAnchor: [50, 30],
      popupAnchor: [0, -30]
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, rgba(74, 144, 226, 0.3) 0%, rgba(155, 81, 224, 0.3) 100%),
        url(${bg}) center/cover,
        linear-gradient(45deg, #667eea 0%, #764ba2 100%)
      `,
      backgroundAttachment: 'fixed',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Navigation Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '12px 0',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Recycle size={20} color="white" />
            </div>
            <span style={{
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: '700',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>
              EcoPulse Marketplace
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['Home', 'Marketplace', 'About', 'Contact'].map((item) => (
              <GlassButton
                key={item}
                isActive={item === 'Marketplace'}
                onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
              >
                {item}
              </GlassButton>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <GlassButton onClick={() => navigate('/signin')}>
              Sign In
            </GlassButton>
            <GlassButton variant="primary">
              Get Started
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div style={{ paddingTop: '120px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Search and View Toggle */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            {/* Search Bar */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Search size={20} color="rgba(255, 255, 255, 0.7)" />
                <input
                  type="text"
                  placeholder="Search materials, sellers, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                />
              </div>
            </div>

            {/* View Toggle and Controls */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <GlassButton
                isActive={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </GlassButton>
              <GlassButton
                isActive={viewMode === 'map'}
                onClick={() => setViewMode('map')}
              >
                Map View
              </GlassButton>
              <GlassButton
                isActive={showAuctions}
                onClick={() => setShowAuctions(!showAuctions)}
              >
                <Gavel size={16} />
                Auctions Only
              </GlassButton>
              <GlassButton onClick={() => setShowFilters(!showFilters)}>
                <Filter size={16} />
                Filters
              </GlassButton>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <GlassCard style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {/* Category Filter */}
                <div>
                  <label style={{ color: 'white', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id} style={{ backgroundColor: '#1f2937' }}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label style={{ color: 'white', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="all" style={{ backgroundColor: '#1f2937' }}>All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc} style={{ backgroundColor: '#1f2937' }}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seller Filter */}
                <div>
                  <label style={{ color: 'white', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    Seller
                  </label>
                  <select
                    value={selectedSeller}
                    onChange={(e) => setSelectedSeller(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="all" style={{ backgroundColor: '#1f2937' }}>All Sellers</option>
                    {sellers.map(seller => (
                      <option key={seller} value={seller} style={{ backgroundColor: '#1f2937' }}>
                        {seller}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginTop: '20px', 
                justifyContent: 'flex-end' 
              }}>
                <GlassButton 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setSelectedSeller('all');
                    setSearchTerm('');
                    setShowAuctions(false);
                  }}
                >
                  Clear All
                </GlassButton>
              </div>
            </GlassCard>
          )}

          {/* Results Count */}
          <div style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {filteredListings.length} materials found
            {showAuctions && ` • Showing auctions only`}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '0 20px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Map View */}
          {viewMode === 'map' && (
            <GlassCard>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Sellers Map View
              </h3>
              <div style={{ height: '500px', borderRadius: '12px', overflow: 'hidden' }}>
                <MapContainer
                  center={[20.5937, 78.9629]} // Center of India
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredListings.map(listing => (
                    <Marker
                      key={listing.id}
                      position={[listing.lat, listing.lng]}
                      icon={createCustomIcon(listing.seller, listing.categoryDisplay)}
                    >
                      <Popup>
                        <div style={{ minWidth: '250px', maxWidth: '300px' }}>
                          <strong style={{ fontSize: '14px', color: '#1f2937' }}>
                            {listing.title}
                          </strong>
                          <br />
                          <span style={{ color: '#6b7280', fontSize: '12px' }}>
                            {listing.seller}
                          </span>
                          <br />
                          <span style={{ color: '#9ca3af', fontSize: '11px' }}>
                            {listing.location}
                          </span>
                          <br />
                          <p style={{ 
                            color: '#4b5563', 
                            fontSize: '11px', 
                            marginTop: '6px',
                            marginBottom: '8px'
                          }}>
                            {listing.description.substring(0, 100)}...
                          </p>
                          <div style={{ 
                            fontSize: '13px', 
                            fontWeight: '600',
                            color: listing.isAuction ? '#f59e0b' : '#10b981',
                            marginBottom: '8px'
                          }}>
                            {listing.price}
                          </div>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            {listing.badges.map(badge => (
                              <TrustBadge key={badge} badge={badge} />
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => setSelectedItem(listing)}
                              style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '11px',
                                cursor: 'pointer'
                              }}
                            >
                              Contact
                            </button>
                            <button
                              onClick={() => setShowPricePredictor(listing)}
                              style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '11px',
                                cursor: 'pointer'
                              }}
                            >
                              AI Price
                            </button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </GlassCard>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <>
              {filteredListings.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredListings.map((listing) => (
                    <GlassCard key={listing.id}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        {/* Header with auction indicator */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                          <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: listing.isAuction 
                              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            position: 'relative'
                          }}>
                            {listing.isAuction ? <Gavel size={28} color="white" /> : <Package size={28} color="white" />}
                            {listing.isAuction && (
                              <div style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: '#ef4444',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: 'white'
                              }}>
                                !
                              </div>
                            )}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <h3 style={{
                                color: 'white',
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                margin: 0
                              }}>
                                {listing.title}
                              </h3>
                              <button
                                onClick={() => {
                                  if (watchedItems.includes(listing.id)) {
                                    setWatchedItems(watchedItems.filter(id => id !== listing.id));
                                  } else {
                                    setWatchedItems([...watchedItems, listing.id]);
                                  }
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: watchedItems.includes(listing.id) ? '#ef4444' : 'rgba(255, 255, 255, 0.5)'
                                }}
                              >
                                <Heart size={18} fill={watchedItems.includes(listing.id) ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                            
                            {/* Trust Badges */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                              {listing.badges.map(badge => (
                                <TrustBadge key={badge} badge={badge} />
                              ))}
                            </div>
                            
                            <p style={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.95rem',
                              marginBottom: '12px',
                              lineHeight: '1.4'
                            }}>
                              {listing.description}
                            </p>
                          </div>
                        </div>

                        {/* Price and Rating */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          padding: '12px'
                        }}>
                          <div>
                            <div style={{
                              fontSize: '1.4rem',
                              fontWeight: '700',
                              color: listing.isAuction ? '#f59e0b' : '#10b981',
                              marginBottom: '4px'
                            }}>
                              {listing.price}
                            </div>
                            <div style={{ 
                              fontSize: '0.85rem', 
                              color: 'rgba(255, 255, 255, 0.7)' 
                            }}>
                              Quantity: {listing.quantity} • Min Order: {listing.minOrder}
                            </div>
                          </div>
                          
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                              <Star size={14} fill="#f59e0b" color="#f59e0b" />
                              <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>
                                {listing.rating}
                              </span>
                              <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>
                                ({listing.reviews})
                              </span>
                            </div>
                            <div style={{ 
                              fontSize: '0.8rem', 
                              color: 'rgba(255, 255, 255, 0.7)' 
                            }}>
                              <Truck size={12} style={{ display: 'inline', marginRight: '4px' }} />
                              {listing.deliveryTime}
                            </div>
                          </div>
                        </div>

                        {/* Auction Timer */}
                        {listing.isAuction && (
                          <div style={{
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            <div>
                              <AuctionTimer endTime={listing.auctionEnd} />
                              <div style={{ 
                                fontSize: '0.8rem', 
                                color: 'rgba(255, 255, 255, 0.7)',
                                marginTop: '4px'
                              }}>
                                {listing.totalBids} bids placed
                              </div>
                            </div>
                            <GlassButton 
                              variant="primary"
                              onClick={() => setSelectedItem(listing)}
                            >
                              Place Bid
                            </GlassButton>
                          </div>
                        )}

                        {/* Seller Info and Actions */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Factory size={20} color="white" />
                            </div>
                            <div>
                              <div style={{ 
                                color: 'white', 
                                fontSize: '0.95rem', 
                                fontWeight: '600',
                                marginBottom: '2px'
                              }}>
                                {listing.seller}
                              </div>
                              <div style={{ 
                                color: 'rgba(255, 255, 255, 0.7)', 
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <MapPin size={12} />
                                {listing.location}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <GlassButton 
                              onClick={() => setShowPricePredictor(listing)}
                              style={{ fontSize: '12px', padding: '8px 12px' }}
                            >
                              <BarChart3 size={14} />
                              AI Price
                            </GlassButton>
                            
                            <GlassButton 
                              onClick={() => setSelectedItem(listing)}
                              variant="primary"
                              style={{ fontSize: '12px', padding: '8px 12px' }}
                            >
                              <MessageCircle size={14} />
                              Contact
                            </GlassButton>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <GlassCard style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                    No materials found matching your criteria.
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1rem', marginTop: '8px' }}>
                    Try adjusting your filters or search terms
                  </div>
                </GlassCard>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showPricePredictor && (
        <PricePredictorModal 
          item={showPricePredictor} 
          onClose={() => setShowPricePredictor(false)} 
        />
      )}
      
      {selectedItem && selectedItem.isAuction && (
        <BiddingModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {selectedItem && !selectedItem.isAuction && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <GlassCard style={{ maxWidth: '500px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                Contact Seller
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>{selectedItem.title}</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                Get in touch with {selectedItem.seller} for this material listing.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Price:</span>
                  <div style={{ color: 'white', fontWeight: '600' }}>{selectedItem.price}</div>
                </div>
                <div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Quantity:</span>
                  <div style={{ color: 'white', fontWeight: '600' }}>{selectedItem.quantity}</div>
                </div>
                <div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Min Order:</span>
                  <div style={{ color: 'white', fontWeight: '600' }}>{selectedItem.minOrder}</div>
                </div>
                <div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Delivery:</span>
                  <div style={{ color: 'white', fontWeight: '600' }}>{selectedItem.deliveryTime}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <GlassButton onClick={() => setSelectedItem(null)}>
                Cancel
              </GlassButton>
              <GlassButton variant="primary">
                <Phone size={14} />
                Call Seller
              </GlassButton>
              <GlassButton variant="primary">
                <Mail size={14} />
                Send Message
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;