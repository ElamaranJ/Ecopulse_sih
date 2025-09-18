import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, MapPin, Calendar, Clock, CheckCircle, DollarSign, Star, Navigation, ArrowLeft,
  Plus, Eye, MessageCircle, Package, Route, Settings, LogOut, Filter, Search, Edit,
  Trash2, X, Bell, TrendingUp, Activity, CreditCard, Download, FileText, Fuel,
  Users, BarChart3, Shield, Award, Zap, Recycle, AlertTriangle, PhoneCall,User
} from 'lucide-react';
import bg from './assets/space.jpg';

const TransportDashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('ecopulse_current_user') || 'null');
  const [activeTab, setActiveTab] = useState('jobs');
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(null);
  const [filters, setFilters] = useState({ type: '', location: '', urgency: '' });
  const [newVehicle, setNewVehicle] = useState({
    type: '', model: '', capacity: '', plateNumber: '', fuelType: '', documents: []
  });
  const [quote, setQuote] = useState({ price: '', delivery_time: '', notes: '' });

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

  // Mock data for transport jobs
  const availableJobs = [
    {
      id: 1,
      type: 'Pickup & Delivery',
      material: 'Copper Wire Scrap',
      weight: '200 kg',
      pickup: 'MetalCorp Industries, Mumbai',
      delivery: 'EcoRecycle Solutions, Pune',
      distance: '150 km',
      urgency: 'Standard',
      requestDate: '2025-01-18',
      client: 'EcoRecycle Solutions',
      budget: '₹3,500 - ₹5,000',
      specialRequirements: 'Covered truck required, fragile materials',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      type: 'Pickup Only',
      material: 'HDPE Plastic Bottles',
      weight: '500 kg',
      pickup: 'EcoPlastic Solutions, Delhi',
      delivery: 'Buyer will arrange pickup',
      distance: '25 km',
      urgency: 'Urgent',
      requestDate: '2025-01-19',
      client: 'GreenTech Industries',
      budget: '₹1,200 - ₹1,800',
      specialRequirements: 'Early morning pickup (6-8 AM)',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1572776685600-aca8c3456337?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      type: 'Long Distance',
      material: 'Mixed Electronic Waste',
      weight: '1500 kg',
      pickup: 'TechRecycle Hub, Pune',
      delivery: 'Processing Center, Chennai',
      distance: '1200 km',
      urgency: 'Standard',
      requestDate: '2025-01-20',
      client: 'TechRecycle Hub',
      budget: '₹15,000 - ₹20,000',
      specialRequirements: 'Temperature controlled, GPS tracking mandatory',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      type: 'Delivery Only',
      material: 'Cotton Textile Waste',
      weight: '800 kg',
      pickup: 'Client warehouse',
      delivery: 'TextileGreen Recyclers, Tirupur',
      distance: '320 km',
      urgency: 'Express',
      requestDate: '2025-01-18',
      client: 'Fashion Forward Ltd',
      budget: '₹8,000 - ₹12,000',
      specialRequirements: 'Waterproof covering, weekend delivery',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1586295166440-e8fabb7e9456?w=300&h=200&fit=crop'
    }
  ];

  const myVehicles = [
    {
      id: 1,
      type: 'Mini Truck',
      model: 'Tata Ace Gold',
      plateNumber: 'MH 12 AB 1234',
      capacity: '750 kg',
      fuelType: 'Diesel',
      status: 'Available',
      lastService: '2025-01-10',
      insurance: 'Valid till Dec 2025',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      type: 'Cargo Van',
      model: 'Mahindra Bolero Pickup',
      plateNumber: 'MH 14 CD 5678',
      capacity: '1200 kg',
      fuelType: 'Diesel',
      status: 'On Trip',
      lastService: '2025-01-05',
      insurance: 'Valid till Nov 2025',
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      type: 'Large Truck',
      model: 'Ashok Leyland Partner',
      plateNumber: 'MH 15 EF 9012',
      capacity: '3000 kg',
      fuelType: 'Diesel',
      status: 'Maintenance',
      lastService: '2025-01-15',
      insurance: 'Valid till Jan 2026',
      image: 'https://images.unsplash.com/photo-1566007992056-e8c6e8e16549?w=300&h=200&fit=crop'
    }
  ];

  const tripHistory = [
    {
      id: 1,
      material: 'Copper Wire Scrap',
      route: 'Mumbai → Pune',
      distance: '150 km',
      completedDate: '2025-01-15',
      client: 'EcoRecycle Solutions',
      earnings: '₹4,200',
      rating: 4.8,
      vehicle: 'Mini Truck',
      duration: '4 hours',
      fuelCost: '₹800',
      status: 'Completed'
    },
    {
      id: 2,
      material: 'HDPE Bottles',
      route: 'Delhi → Gurgaon',
      distance: '35 km',
      completedDate: '2025-01-12',
      client: 'GreenTech Industries',
      earnings: '₹1,500',
      rating: 4.9,
      vehicle: 'Cargo Van',
      duration: '2 hours',
      fuelCost: '₹300',
      status: 'Completed'
    },
    {
      id: 3,
      material: 'Electronic Components',
      route: 'Pune → Chennai',
      distance: '1200 km',
      completedDate: '2025-01-10',
      client: 'TechRecycle Hub',
      earnings: '₹18,000',
      rating: 4.7,
      vehicle: 'Large Truck',
      duration: '24 hours',
      fuelCost: '₹4,500',
      status: 'Completed'
    }
  ];

  const ratingsReviews = [
    {
      id: 1,
      client: 'EcoRecycle Solutions',
      rating: 4.8,
      review: 'Excellent service! Driver was professional and delivery was on time.',
      date: '2025-01-15',
      job: 'Copper Wire Scrap Transport'
    },
    {
      id: 2,
      client: 'GreenTech Industries',
      rating: 4.9,
      review: 'Very reliable transport partner. Highly recommended!',
      date: '2025-01-12',
      job: 'HDPE Bottles Pickup'
    },
    {
      id: 3,
      client: 'TechRecycle Hub',
      rating: 4.7,
      review: 'Good service, but could improve communication during transit.',
      date: '2025-01-10',
      job: 'Long Distance E-Waste Transport'
    }
  ];

  const stats = [
    { label: 'Active Jobs', value: '3', icon: Truck, color: '#3b82f6', trend: '+2' },
    { label: 'This Month Earnings', value: '₹45,200', icon: DollarSign, color: '#10b981', trend: '+18%' },
    { label: 'Total Trips', value: '127', icon: Route, color: '#8b5cf6', trend: '+12' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: '#f59e0b', trend: '+0.2' }
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
      warning: {
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        border: '1px solid rgba(245, 158, 11, 0.4)'
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

  const handleAcceptJob = (job) => {
    console.log('Accepting job:', job);
    setShowQuoteModal(null);
  };

  const handleDeclineJob = (jobId) => {
    console.log('Declining job:', jobId);
  };

  const handleSubmitQuote = () => {
    console.log('Submitting quote:', quote);
    setShowQuoteModal(null);
    setQuote({ price: '', delivery_time: '', notes: '' });
  };

  const renderAvailableJobs = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
          Available Transport Jobs
        </h2>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={filters.urgency}
            onChange={(e) => setFilters({...filters, urgency: e.target.value})}
            style={{ ...inputStyle, marginBottom: '0', minWidth: '120px' }}
          >
            <option value="">All Urgency</option>
            <option value="Standard">Standard</option>
            <option value="Urgent">Urgent</option>
            <option value="Express">Express</option>
          </select>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            style={{ ...inputStyle, marginBottom: '0', minWidth: '150px' }}
          >
            <option value="">All Types</option>
            <option value="Pickup & Delivery">Pickup & Delivery</option>
            <option value="Pickup Only">Pickup Only</option>
            <option value="Delivery Only">Delivery Only</option>
            <option value="Long Distance">Long Distance</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {availableJobs.map((job) => (
          <div key={job.id} style={glassCardStyle}>
            <img 
              src={job.image} 
              alt={job.material}
              style={{ 
                width: '100%', 
                height: '160px', 
                borderRadius: '12px', 
                objectFit: 'cover', 
                marginBottom: '16px' 
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>
                  {job.material}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span 
                    style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      fontWeight: '500',
                      backgroundColor: 
                        job.urgency === 'Express' ? 'rgba(239, 68, 68, 0.2)' :
                        job.urgency === 'Urgent' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                      color: 
                        job.urgency === 'Express' ? '#ef4444' :
                        job.urgency === 'Urgent' ? '#f59e0b' : '#3b82f6',
                      border: `1px solid ${
                        job.urgency === 'Express' ? 'rgba(239, 68, 68, 0.3)' :
                        job.urgency === 'Urgent' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.3)'
                      }`
                    }}
                  >
                    {job.urgency}
                  </span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                    {job.type}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Weight:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{job.weight}</p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Distance:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{job.distance}</p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={16} style={{ color: '#10b981' }} />
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Pickup</span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 12px 24px', fontSize: '14px' }}>
                {job.pickup}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Navigation size={16} style={{ color: '#ef4444' }} />
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Delivery</span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 12px 24px', fontSize: '14px' }}>
                {job.delivery}
              </p>
            </div>

            <div style={{ 
              padding: '12px', 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '8px', 
              marginBottom: '16px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Budget Range:</span>
                <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{job.budget}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Client:</span>
                <span style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>{job.client}</span>
              </div>
            </div>

            {job.specialRequirements && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', margin: '0 0 4px 0' }}>
                  Special Requirements:
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px', margin: '0', fontStyle: 'italic' }}>
                  {job.specialRequirements}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <GlassButton 
                variant="primary" 
                onClick={() => setShowQuoteModal(job)}
                style={{ flex: 1 }}
              >
                <DollarSign size={16} />
                Quote & Accept
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

  const renderFleetManagement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
          Fleet Management
        </h2>
        <GlassButton onClick={() => setShowAddVehicle(true)} variant="primary">
          <Plus size={18} />
          Add Vehicle
        </GlassButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {myVehicles.map((vehicle) => (
          <div key={vehicle.id} style={glassCardStyle}>
            <img 
              src={vehicle.image} 
              alt={vehicle.model}
              style={{ 
                width: '100%', 
                height: '180px', 
                borderRadius: '12px', 
                objectFit: 'cover', 
                marginBottom: '16px' 
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>
                  {vehicle.model}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '14px' }}>
                  {vehicle.type} • {vehicle.plateNumber}
                </p>
              </div>
              <span 
                style={{ 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '500',
                  backgroundColor: 
                    vehicle.status === 'Available' ? 'rgba(16, 185, 129, 0.2)' :
                    vehicle.status === 'On Trip' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: 
                    vehicle.status === 'Available' ? '#10b981' :
                    vehicle.status === 'On Trip' ? '#3b82f6' : '#f59e0b',
                  border: `1px solid ${
                    vehicle.status === 'Available' ? 'rgba(16, 185, 129, 0.3)' :
                    vehicle.status === 'On Trip' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'
                  }`
                }}
              >
                {vehicle.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Capacity:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{vehicle.capacity}</p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Fuel Type:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{vehicle.fuelType}</p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Last Service:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{vehicle.lastService}</p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Insurance:</span>
                <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{vehicle.insurance}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <GlassButton variant="secondary" style={{ flex: 1 }}>
                <Edit size={16} />
                Edit Details
              </GlassButton>
              <GlassButton variant="secondary" style={{ padding: '12px' }}>
                <Eye size={16} />
              </GlassButton>
              {vehicle.status === 'Available' && (
                <GlassButton variant="danger" style={{ padding: '12px' }}>
                  <Trash2 size={16} />
                </GlassButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTripHistory = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        Trip History
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tripHistory.map((trip) => (
          <div key={trip.id} style={glassCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0' }}>
                    {trip.material}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                      {trip.rating}
                    </span>
                  </div>
                </div>
                
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 12px 0' }}>
                  Client: {trip.client}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Route:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{trip.route}</p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Distance:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{trip.distance}</p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Duration:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{trip.duration}</p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Vehicle:</span>
                    <p style={{ color: 'white', fontWeight: '500', margin: '4px 0 0 0' }}>{trip.vehicle}</p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px'
                }}>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Earnings:</span>
                    <p style={{ color: '#10b981', fontWeight: '600', margin: '0', fontSize: '16px' }}>
                      {trip.earnings}
                    </p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Fuel Cost:</span>
                    <p style={{ color: '#ef4444', fontWeight: '500', margin: '0', fontSize: '14px' }}>
                      {trip.fuelCost}
                    </p>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>Net Profit:</span>
                    <p style={{ color: 'white', fontWeight: '600', margin: '0', fontSize: '16px' }}>
                      ₹{(parseInt(trip.earnings.replace('₹', '').replace(',', '')) - parseInt(trip.fuelCost.replace('₹', '').replace(',', ''))).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                <GlassButton variant="secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  <Download size={14} />
                  Receipt
                </GlassButton>
                <GlassButton variant="secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  <Eye size={14} />
                  Details
                </GlassButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLiveTracking = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        Live Tracking
      </h2>

      <div style={glassCardStyle}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Navigation size={64} style={{ margin: '0 auto 20px auto', color: 'rgba(255, 255, 255, 0.5)' }} />
          <h3 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '20px' }}>No Active Trips</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 20px 0' }}>
            Accept a transport job to enable live GPS tracking
          </p>
          <GlassButton variant="primary" onClick={() => setActiveTab('jobs')}>
            <Truck size={16} />
            Browse Available Jobs
          </GlassButton>
        </div>
      </div>

      {/* GPS Tracking Features Info */}
      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
          GPS Tracking Features
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              padding: '8px', 
              borderRadius: '8px', 
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)' 
            }}>
              <MapPin size={20} style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: '500', margin: '0', fontSize: '14px' }}>Real-time Location</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '12px' }}>Live GPS coordinates</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              padding: '8px', 
              borderRadius: '8px', 
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)' 
            }}>
              <Route size={20} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: '500', margin: '0', fontSize: '14px' }}>Route Optimization</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '12px' }}>Best path suggestions</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              padding: '8px', 
              borderRadius: '8px', 
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.4)' 
            }}>
              <Bell size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: '500', margin: '0', fontSize: '14px' }}>Smart Alerts</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '12px' }}>Traffic & delay notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRatingsReviews = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0' }}>
        Ratings & Reviews
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Overall Rating Card */}
        <div style={glassCardStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
            Overall Rating
          </h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#fbbf24', margin: '0 0 8px 0' }}>
              4.8
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  size={20} 
                  style={{ 
                    color: star <= 4 ? '#fbbf24' : 'rgba(255, 255, 255, 0.3)', 
                    fill: star <= 4 ? '#fbbf24' : 'transparent' 
                  }} 
                />
              ))}
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0' }}>Based on 127 reviews</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={glassCardStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
            Performance Stats
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>On-time Delivery</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>96%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Customer Satisfaction</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>4.8/5</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Repeat Clients</span>
              <span style={{ color: '#3b82f6', fontWeight: '600' }}>78%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Response Time</span>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>{'<'} 2 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ratingsReviews.map((review) => (
          <div key={review.id} style={glassCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {review.client}
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0', fontSize: '14px' }}>
                  {review.job} • {review.date}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                <span style={{ color: 'white', fontWeight: '500' }}>{review.rating}</span>
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0', lineHeight: '1.5' }}>
              "{review.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );

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
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontWeight: '500', margin: '0 0 8px 0' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>
                    {stat.value}
                  </p>
                  <p style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', margin: '0' }}>
                    {stat.trend}
                  </p>
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

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div style={{ ...glassCardStyle, textAlign: 'center' }}>
          <Truck style={{ margin: '0 auto 16px auto', color: '#3b82f6' }} size={32} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>
            Browse Jobs
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 16px 0' }}>
            Find new transport opportunities
          </p>
          <GlassButton onClick={() => setActiveTab('jobs')} variant="primary" style={{ width: '100%' }}>
            View Available Jobs
          </GlassButton>
        </div>

        <div style={{ ...glassCardStyle, textAlign: 'center' }}>
          <Plus style={{ margin: '0 auto 16px auto', color: '#10b981' }} size={32} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>
            Add Vehicle
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 16px 0' }}>
            Expand your fleet capacity
          </p>
          <GlassButton onClick={() => setShowAddVehicle(true)} variant="secondary" style={{ width: '100%' }}>
            Add New Vehicle
          </GlassButton>
        </div>

        <div style={{ ...glassCardStyle, textAlign: 'center' }}>
          <BarChart3 style={{ margin: '0 auto 16px auto', color: '#8b5cf6' }} size={32} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>
            View Analytics
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '0 0 16px 0' }}>
            Track your performance metrics
          </p>
          <GlassButton onClick={() => setActiveTab('history')} variant="secondary" style={{ width: '100%' }}>
            View Trip History
          </GlassButton>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={glassCardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 16px 0' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}>
            <CheckCircle size={20} style={{ color: '#10b981' }} />
            <div>
              <p style={{ color: 'white', margin: '0', fontSize: '14px', fontWeight: '500' }}>
                Trip completed: Copper Wire Scrap delivery
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0', fontSize: '12px' }}>
                2 hours ago • Earned ₹4,200
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}>
            <Star size={20} style={{ color: '#fbbf24' }} />
            <div>
              <p style={{ color: 'white', margin: '0', fontSize: '14px', fontWeight: '500' }}>
                New 5-star review from EcoRecycle Solutions
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0', fontSize: '12px' }}>
                5 hours ago • "Excellent service!"
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}>
            <Package size={20} style={{ color: '#3b82f6' }} />
            <div>
              <p style={{ color: 'white', margin: '0', fontSize: '14px', fontWeight: '500' }}>
                New job available: HDPE Bottles pickup
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0', fontSize: '12px' }}>
                8 hours ago • Budget: ₹1,200 - ₹1,800
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Quote Modal
  const renderQuoteModal = () => (
    showQuoteModal && (
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
              Submit Quote
            </h2>
            <button
              onClick={() => setShowQuoteModal(null)}
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

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '16px' }}>
              Job: {showQuoteModal.material}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '14px' }}>
              {showQuoteModal.pickup} → {showQuoteModal.delivery}
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '4px 0 0 0', fontSize: '14px' }}>
              Weight: {showQuoteModal.weight} • Distance: {showQuoteModal.distance}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Your Price Quote (₹) *
              </label>
              <input
                type="number"
                placeholder="Enter your price..."
                value={quote.price}
                onChange={(e) => setQuote(prev => ({ ...prev, price: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Estimated Delivery Time *
              </label>
              <select
                value={quote.delivery_time}
                onChange={(e) => setQuote(prev => ({ ...prev, delivery_time: e.target.value }))}
                style={inputStyle}
              >
                <option value="">Select delivery time</option>
                <option value="same-day">Same Day</option>
                <option value="next-day">Next Day</option>
                <option value="2-3-days">2-3 Days</option>
                <option value="3-5-days">3-5 Days</option>
                <option value="1-week">1 Week</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Additional Notes
              </label>
              <textarea
                placeholder="Any special handling, insurance, or service details..."
                value={quote.notes}
                onChange={(e) => setQuote(prev => ({ ...prev, notes: e.target.value }))}
                style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
              <GlassButton 
                variant="primary" 
                onClick={handleSubmitQuote}
                style={{ flex: 1 }}
              >
                Submit Quote & Accept
              </GlassButton>
              <GlassButton 
                variant="secondary" 
                onClick={() => setShowQuoteModal(null)}
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

  // Add Vehicle Modal
  const renderAddVehicleModal = () => (
    showAddVehicle && (
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
              Add New Vehicle
            </h2>
            <button
              onClick={() => setShowAddVehicle(false)}
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
                Vehicle Type *
              </label>
              <select
                value={newVehicle.type}
                onChange={(e) => setNewVehicle(prev => ({ ...prev, type: e.target.value }))}
                style={inputStyle}
              >
                <option value="">Select vehicle type</option>
                <option value="Mini Truck">Mini Truck</option>
                <option value="Cargo Van">Cargo Van</option>
                <option value="Large Truck">Large Truck</option>
                <option value="Container Truck">Container Truck</option>
                <option value="Flatbed Truck">Flatbed Truck</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Vehicle Model *
              </label>
              <input
                type="text"
                placeholder="e.g., Tata Ace Gold, Mahindra Bolero..."
                value={newVehicle.model}
                onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Capacity (kg) *
                </label>
                <input
                  type="number"
                  placeholder="Maximum load capacity"
                  value={newVehicle.capacity}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, capacity: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Fuel Type *
                </label>
                <select
                  value={newVehicle.fuelType}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, fuelType: e.target.value }))}
                  style={inputStyle}
                >
                  <option value="">Select fuel type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="CNG">CNG</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                License Plate Number *
              </label>
              <input
                type="text"
                placeholder="e.g., MH 12 AB 1234"
                value={newVehicle.plateNumber}
                onChange={(e) => setNewVehicle(prev => ({ ...prev, plateNumber: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Vehicle Documents
              </label>
              <div style={{ 
                border: '2px dashed rgba(255, 255, 255, 0.4)', 
                borderRadius: '12px', 
                padding: '24px', 
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)' 
              }}>
                <FileText style={{ margin: '0 auto 8px auto', color: 'rgba(255, 255, 255, 0.6)' }} size={32} />
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 4px 0' }}>
                  Upload RC, Insurance, PUC certificates
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', margin: '0' }}>
                  PNG, JPG, PDF up to 5MB each
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
              <GlassButton 
                variant="primary" 
                onClick={() => {
                  console.log('Adding vehicle:', newVehicle);
                  setShowAddVehicle(false);
                  setNewVehicle({ type: '', model: '', capacity: '', plateNumber: '', fuelType: '', documents: [] });
                }}
                style={{ flex: 1 }}
              >
                Add Vehicle
              </GlassButton>
              <GlassButton 
                variant="secondary" 
                onClick={() => setShowAddVehicle(false)}
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
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '8px 0 0 0' }}>Transport Dashboard</p>
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
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'jobs', label: 'Available Jobs', icon: Truck },
              { id: 'fleet', label: 'Fleet Management', icon: Package },
              { id: 'history', label: 'Trip History', icon: Route },
              { id: 'tracking', label: 'Live Tracking', icon: Navigation },
              { id: 'ratings', label: 'Ratings & Reviews', icon: Star },
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
            {activeTab === 'jobs' && renderAvailableJobs()}
            {activeTab === 'fleet' && renderFleetManagement()}
            {activeTab === 'history' && renderTripHistory()}
            {activeTab === 'tracking' && renderLiveTracking()}
            {activeTab === 'ratings' && renderRatingsReviews()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderQuoteModal()}
      {renderAddVehicleModal()}
    </div>
  );
};

export default TransportDashboard;
