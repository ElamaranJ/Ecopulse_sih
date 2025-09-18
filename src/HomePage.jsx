import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Filter, MapPin, Star, Phone, Mail, Package, Recycle, Leaf, Users, TrendingUp, CheckCircle, ChevronDown, ArrowRight, Zap, Globe, Award, Shield, BarChart3, Sparkles } from 'lucide-react';
import bg from './assets/space.jpg';
// react-leaflet + leaflet
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from "react-router-dom";
// Fix for default marker icon paths (webpack / CRA friendly imports)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icon with seller info
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

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Categories
  const categories = [
    { id: 'all', name: 'All Categories', icon: Sparkles, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', count: '2.5k+' },
    { id: 'metal', name: 'Metal Scrap', icon: Package, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', count: '850+' },
    { id: 'plastic', name: 'Plastic Waste', icon: Recycle, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', count: '1.2k+' },
    { id: 'textile', name: 'Textile Waste', icon: Package, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', count: '650+' },
    { id: 'ewaste', name: 'E-Waste', icon: Zap, color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', count: '420+' },
    { id: 'paper', name: 'Paper & Cardboard', icon: Package, color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', count: '980+' }
  ];

  // Enhanced listings with category display names
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
      description: 'High-grade copper wire scrap, 99% pure, suitable for recycling into new electrical components.'
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
      description: 'Pre-sorted HDPE bottles, clean and ready for processing into new plastic products.'
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
      description: '100% organic cotton textile waste from garment manufacturing, perfect for upcycling.'
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
      description: 'Various computer components including motherboards, RAM, and processors for precious metal recovery.'
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
      description: 'Clean aluminium sheets from construction and manufacturing, ideal for melting and reprocessing.'
    },
    { 
      id: 6, 
      title: 'Used PET Bottles', 
      seller: 'PlasticRenew', 
      location: 'Chennai, Tamil Nadu', 
      lat: 13.0827, 
      lng: 80.2707, 
      category: 'plastic',
      categoryDisplay: 'Plastic Waste',
      description: 'Large quantity of used PET bottles, sorted and cleaned, ready for bottle-to-bottle recycling.'
    },
    { 
      id: 7, 
      title: 'Electronic Circuit Boards', 
      seller: 'E-Waste Masters', 
      location: 'Hyderabad, Telangana', 
      lat: 17.3850, 
      lng: 78.4867, 
      category: 'ewaste',
      categoryDisplay: 'E-Waste',
      description: 'Various electronic circuit boards from different devices, containing valuable metals and components.'
    },
    { 
      id: 8, 
      title: 'Old Cardboard Sheets', 
      seller: 'PaperCycle', 
      location: 'Pune, Maharashtra', 
      lat: 18.5204, 
      lng: 73.8567, 
      category: 'paper',
      categoryDisplay: 'Paper & Cardboard',
      description: 'High-quality cardboard sheets from packaging industry, suitable for making new cardboard products.'
    },
    { 
      id: 9, 
      title: 'Scrap Iron & Steel', 
      seller: 'IronWorks', 
      location: 'Kolkata, West Bengal', 
      lat: 22.5726, 
      lng: 88.3639, 
      category: 'metal',
      categoryDisplay: 'Metal Scrap',
      description: 'Mixed iron and steel scrap from industrial operations, perfect for steel mill processing.'
    },
    { 
      id: 10, 
      title: 'Organic Textile Waste', 
      seller: 'EcoFabrics', 
      location: 'Bhubaneswar, Odisha', 
      lat: 20.2961, 
      lng: 85.8245, 
      category: 'textile',
      categoryDisplay: 'Textile Waste',
      description: 'Mixed organic textile waste including cotton, linen, and hemp materials for fiber recovery.'
    }
  ];

  const stats = [
    { label: 'Waste Processed', value: '50,000+', unit: 'tons', icon: Recycle, color: '#10b981' },
    { label: 'Active Partners', value: '15,000+', unit: 'users', icon: Users, color: '#3b82f6' },
    { label: 'Carbon Reduced', value: '120,000', unit: 'kg CO₂', icon: Leaf, color: '#059669' },
    { label: 'Revenue Generated', value: '₹45.2', unit: 'crores', icon: TrendingUp, color: '#8b5cf6' }
  ];

  const features = [
    { icon: Shield, title: 'Verified Sellers', desc: 'All partners undergo rigorous verification' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track sustainability metrics and impact' },
    { icon: Globe, title: 'Global Network', desc: 'Connect with partners across India and beyond' },
    { icon: Award, title: 'Quality Assured', desc: 'Premium materials with quality guarantees' }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const GlassButton = ({ children, isActive, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`glass-button ${isActive ? 'active' : ''} ${className}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
        border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
        borderRadius: '16px',
        padding: '12px 24px',
        color: isActive ? '#1d4ed8' : 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isActive
          ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        userSelect: 'none',
        outline: 'none'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        }
      }}
    >
      {children}
    </button>
  );

  const GlassCard = ({ children, className = '' }) => (
    <div
      className={`glass-card ${className}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease'
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

  // All sellers map with custom markers
  const AllSellersMap = ({ markers }) => {
    const mapRef = useRef(null);

    useEffect(() => {
      if (mapRef.current && markers.length) {
        const bounds = markers.map(m => [m.lat, m.lng]);
        mapRef.current.fitBounds(bounds, { padding: [40, 40] });
      }
    }, [markers]);

    if (!markers || markers.length === 0) return null;

    return (
      <div style={{ height: '400px', width: '100%', borderRadius: 12, overflow: 'hidden' }}>
        <MapContainer
          center={[markers[0].lat, markers[0].lng]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map(m => (
            <Marker 
              key={m.id} 
              position={[m.lat, m.lng]}
              icon={createCustomIcon(m.seller, m.categoryDisplay)}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <strong style={{ fontSize: '14px', color: '#1f2937' }}>{m.title}</strong>
                  <br />
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>{m.seller}</span>
                  <br />
                  <span style={{ color: '#9ca3af', fontSize: '11px' }}>{m.location}</span>
                  <br />
                  <span style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    marginTop: '4px',
                    display: 'inline-block'
                  }}>
                    {m.categoryDisplay}
                  </span>
                </div>
              </Popup>
              <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                  {m.seller}<br/>
                  <span style={{ fontSize: '8px' }}>{m.categoryDisplay}</span>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
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

      {/* Glass Navigation Bar */}
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
          {/* Logo Section */}
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
              EcoPulse
            </span>
          </div>

          {/* Navigation Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {['Home', 'Marketplace', 'About', 'Contact'].map((item) => (
  <button
    key={item}
    onClick={() => {
  if (item === 'Home') {
    if (window.location.pathname === '/') {
      // Force scroll even if already on Home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      // after navigating, also scroll
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  } else {
    navigate(`/${item.toLowerCase()}`);
    // optional: auto scroll for other pages too
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }
}}

    style={{
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      padding: '12px 24px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      userSelect: 'none',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    }}
  >
    {item}
  </button>
))}
          </div>

          {/* User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
            onClick={() => navigate("/signin")}
              style={{  
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '12px 24px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            >
              Sign In
            </button>
           <button
  onClick={() => navigate("/signup")}
  style={{
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    borderRadius: '12px',
    padding: '10px 20px',
    color: '#dfeee9ff',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)',
    outline: 'none'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'rgba(19, 219, 159, 0.98)';
    e.target.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'rgba(33, 189, 137, 1)';
    e.target.style.transform = 'translateY(0)';
  }}
>
  Get Started
</button>

          </div>
        </div>
      </div>

      {/* Header Section */}
      <div style={{ paddingTop: '120px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          EcoPulse
        </h1>

        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          India's most advanced AI-powered waste marketplace connecting industries with recyclers.
          Join the circular economy revolution and create sustainable value from waste materials.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '500px', margin: '0 auto 40px', position: 'relative' }}>
          <div style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                fontWeight: '500',
                '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
              }}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <GlassButton
            isActive={activeTab === 'browse'}
            onClick={() => setActiveTab('browse')}
          >
            Browse Materials
          </GlassButton>
          <GlassButton
            isActive={activeTab === 'sell'}
            onClick={() => setActiveTab('sell')}
          >
            Sell Waste
          </GlassButton>
          <GlassButton
            isActive={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </GlassButton>
        </div>

        {/* Quick "All sellers on map" button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
          <GlassButton onClick={() => setIsVisible(prev => ({ ...prev, allSellers: !prev.allSellers }))}>
            {isVisible.allSellers ? 'Hide Sellers Map' : 'View All Sellers on Map'}
          </GlassButton>
        </div>
      </div>

      {/* Conditionally show all-sellers map */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {isVisible.allSellers && (
            <GlassCard>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                All Verified Sellers - Live Map View
              </h3>
              <AllSellersMap markers={filteredListings.map(l => ({ 
                id: l.id, 
                title: l.title, 
                seller: l.seller, 
                location: l.location, 
                lat: l.lat, 
                lng: l.lng, 
                categoryDisplay: l.categoryDisplay 
              }))} />
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                textAlign: 'center',
                marginTop: '12px'
              }}>
                Click on any seller marker to view their details and offerings
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div style={{ padding: '0 20px 40px' }}>
        <GlassCard style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            Discover premium waste materials across multiple categories
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive ? '#1d4ed8' : 'white',
                    boxShadow: isActive
                      ? '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      : '0 6px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={24} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>
                      {category.name}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      color: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)'
                    }}>
                      {category.count} items
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            {filteredListings.length} verified materials available
          </div>
        </GlassCard>
      </div>

      {/* Listings Grid */}
      <div style={{ padding: '0 20px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filteredListings.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {filteredListings.map((listing) => (
                <GlassCard key={listing.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Package size={28} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          color: 'white',
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          marginBottom: '8px'
                        }}>
                          {listing.title}
                        </h3>
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '0.95rem',
                          marginBottom: '12px'
                        }}>
                          {listing.description}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                        {listing.seller} • {listing.location}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <GlassButton onClick={() => console.log('Contact seller')}>
                          Contact Seller
                        </GlassButton>

                        {/* View on map button toggles an inline map for this listing */}
                        <GlassButton onClick={() => setIsVisible(prev => ({ ...prev, [listing.id]: !prev[listing.id] }))}>
                          {isVisible[listing.id] ? 'Hide Location' : 'View Location'}
                        </GlassButton>
                      </div>
                    </div>

                    {/* Individual listing map with custom marker */}
                    {isVisible[listing.id] && listing.lat && listing.lng && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ height: 250, borderRadius: 12, overflow: 'hidden' }}>
                          <MapContainer 
                            center={[listing.lat, listing.lng]} 
                            zoom={12} 
                            style={{ height: '100%', width: '100%' }} 
                            scrollWheelZoom={false}
                          >
                            <TileLayer
                              attribution='&copy; OpenStreetMap contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker 
                              position={[listing.lat, listing.lng]}
                              icon={createCustomIcon(listing.seller, listing.categoryDisplay)}
                            >
                              <Popup>
                                <div style={{ minWidth: '200px' }}>
                                  <strong style={{ fontSize: '14px', color: '#1f2937' }}>{listing.title}</strong>
                                  <br />
                                  <span style={{ color: '#6b7280', fontSize: '12px' }}>{listing.seller}</span>
                                  <br />
                                  <span style={{ color: '#9ca3af', fontSize: '11px' }}>{listing.location}</span>
                                  <br />
                                  <p style={{ 
                                    color: '#4b5563', 
                                    fontSize: '11px', 
                                    marginTop: '6px',
                                    marginBottom: '6px'
                                  }}>
                                    {listing.description.substring(0, 100)}...
                                  </p>
                                  <span style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    marginTop: '4px',
                                    display: 'inline-block'
                                  }}>
                                    {listing.categoryDisplay}
                                  </span>
                                </div>
                              </Popup>
                              <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                                <div style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                                  {listing.seller}<br/>
                                  <span style={{ fontSize: '8px' }}>{listing.categoryDisplay}</span>
                                </div>
                              </Tooltip>
                            </Marker>
                          </MapContainer>
                        </div>
                      </div>
                    )}
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
                Try adjusting your search criteria or explore different categories
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ padding: '0 20px 60px' }}>
        <GlassCard style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    backgroundColor: stat.color,
                    marginBottom: '16px'
                  }}>
                    <IconComponent size={28} color="white" />
                  </div>
                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default HomePage;