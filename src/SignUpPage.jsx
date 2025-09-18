import React, { useState } from "react";
import { ChevronLeft, Upload, Building, ShoppingCart, Truck, User, Mail, Lock, Phone, MapPin, FileText, CreditCard, Package, Recycle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import bg from './assets/space.jpg';

const SignUpPage = () => {
  // Get role from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedRole = urlParams.get('role');
  
  // Set initial step based on role
  const [currentStep, setCurrentStep] = useState(selectedRole ? selectedRole : 'selection');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  // Use the same background style as HomePage
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

  // Enhanced glass container style to match HomePage
  const glassContainerStyle = {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    color: 'white',
    maxWidth: '520px',
    width: '100%',
    margin: '20px'
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
    boxSizing: "border-box"
  };

  const GlassButton = ({ children, onClick, variant = 'primary', type = 'button', style = {} }) => {
    const baseStyle = {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      padding: '12px 24px',
      color: 'white',
      fontWeight: '600',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      userSelect: 'none',
      outline: 'none',
      width: '100%',
      ...style
    };

    const variantStyles = {
      primary: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 0.4)'
      },
      secondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      },
      back: {
        backgroundColor: 'transparent',
        padding: '8px 16px',
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        marginBottom: '20px'
      }
    };

    return (
      <button
        type={type}
        onClick={onClick}
        style={{...baseStyle, ...variantStyles[variant]}}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
          } else {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          if (variant === 'primary') {
            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
          } else {
            e.target.style.backgroundColor = variantStyles[variant].backgroundColor;
          }
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        }}
      >
        {children}
      </button>
    );
  };

  const GlassCard = ({ children, onClick, style = {} }) => (
    <div
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        marginBottom: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        }
      }}
    >
      {children}
    </div>
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };
// Update the role selection logic
const selectUserType = (userType) => {
  setCurrentStep(userType.toLowerCase());
};

// Add a back to role selection option if user came from homepage
const handleBackToSelection = () => {
  if (selectedRole) {
    navigate('/'); // Go back to homepage
  } else {
    setCurrentStep('selection');
  }
};

 const handleSubmit = (e, userType) => {
  e.preventDefault();
  console.log(`${userType} sign up with:`, formData);
  
  // Convert URL role to proper case
  const roleMap = {
    'buyer': 'Buyer',
    'seller': 'Seller', 
    'transport': 'Transport Partner'
  };
  
  const actualUserType = roleMap[userType] || userType;
  
  // Store user data in localStorage (simulating a database)
  const userData = {
    email: formData.email,
    password: formData.password, // In real app, this would be hashed
    role: actualUserType.toLowerCase().replace(' ', ''), // 'buyer', 'seller', 'transportpartner'
    name: formData.name || formData.businessName || formData.companyName,
    registrationDate: new Date().toISOString(),
    ...formData
  };
  
  // Get existing users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem('ecopulse_users') || '[]');
  
  // Check if user already exists
  const userExists = existingUsers.find(user => user.email === formData.email);
  if (userExists) {
    alert('User with this email already exists! Please sign in instead.');
    return;
  }
  
  // Add new user to the list
  existingUsers.push(userData);
  localStorage.setItem('ecopulse_users', JSON.stringify(existingUsers));
  
  // Store current user session
  localStorage.setItem('ecopulse_current_user', JSON.stringify(userData));
  
  // Show success message and redirect
  if (actualUserType === 'Seller') {
    alert('Seller registration successful! Redirecting to dashboard...');
    navigate('/seller-dashboard');
  } else if (actualUserType === 'Buyer') {
    alert('Buyer registration successful! Redirecting to dashboard...');
    navigate('/buyer-dashboard');
  } else if (actualUserType === 'Transport Partner') {
    alert('Transport Partner registration successful! Redirecting to dashboard...');
    navigate('/transport-dashboard');
  }
};




  // Navigation Header matching HomePage style
  const NavHeader = () => (
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
                  navigate('/');
                } else {
                  navigate(`/${item.toLowerCase()}`);
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

        {/* Right side text */}
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
          Join the circular economy revolution
        </div>
      </div>
    </div>
  );

  // User Type Selection Page
  if (currentStep === 'selection') {
    return (
      <div style={backgroundStyle}>
        <NavHeader />
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          paddingTop: "100px"
        }}>
          <div style={glassContainerStyle}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '2.2rem', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}>
                Choose Your Account Type
              </h2>
              <p style={{ 
                margin: 0, 
                color: "rgba(255,255,255,0.85)", 
                fontSize: '1.1rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}>
                Select the option that best describes your role in the EcoPulse marketplace
              </p>
            </div>

            <GlassCard onClick={() => selectUserType('seller')}>
              <Building size={32} style={{ marginBottom: 12, color: "#10b981" }} />
              <h3 style={{ margin: "8px 0", fontSize: "1.2rem", fontWeight: '600' }}>Seller / Supplier</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: 0 }}>
                I want to sell waste materials and scrap to buyers
              </p>
            </GlassCard>

            <GlassCard onClick={() => selectUserType('buyer')}>
              <ShoppingCart size={32} style={{ marginBottom: 12, color: "#3b82f6" }} />
              <h3 style={{ margin: "8px 0", fontSize: "1.2rem", fontWeight: '600' }}>Buyer / Recycler</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: 0 }}>
                I want to purchase waste materials for recycling or processing
              </p>
            </GlassCard>

            <GlassCard onClick={() => selectUserType('transport')}>
              <Truck size={32} style={{ marginBottom: 12, color: "#f59e0b" }} />
              <h3 style={{ margin: "8px 0", fontSize: "1.2rem", fontWeight: '600' }}>Transportation Partner</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: 0 }}>
                I provide logistics and transportation services
              </p>
            </GlassCard>

            <div style={{ marginTop: 24, fontSize: 14, color: "rgba(255,255,255,0.75)", textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "rgba(255,255,255,0.95)", textDecoration: "underline" }}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Seller Registration Form
if (currentStep === 'seller') {
  return (
    <div style={backgroundStyle}>
      <NavHeader />
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        paddingTop: "100px",
        paddingBottom: "40px"
      }}>
        <div style={glassContainerStyle}>
          <GlassButton 
            variant="back" 
            onClick={() => setCurrentStep('selection')}
          >
            <ChevronLeft size={16} /> Back to Selection
          </GlassButton>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{
              padding: '12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building size={24} color="white" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: '600' }}>Seller Registration</h2>
              <p style={{ margin: '4px 0 0 0', color: "rgba(255,255,255,0.8)", fontSize: '0.9rem' }}>
                Register as a waste material seller/supplier
              </p>
            </div>
          </div>

          <form onSubmit={(e) => handleSubmit(e, 'Seller')}>
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Mail size={14} /> Email ID *
            </label>
            <input
              type="email"
              placeholder="your-business@example.com"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Lock size={14} /> Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Lock size={14} /> Confirm Password *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <User size={14} /> Full Name / Company Name *
            </label>
            <input
              type="text"
              placeholder="Your Name or Company Name"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Phone size={14} /> Contact Number *
            </label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <MapPin size={14} /> Address / Location *
            </label>
            <textarea
              placeholder="Complete address"
              required
              style={{...inputStyle, minHeight: "80px", resize: "vertical", fontFamily: "inherit"}}
              onChange={(e) => handleInputChange('address', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Package size={14} /> Materials You're Interested In *
            </label>
            <select
              style={inputStyle}
              required
              onChange={(e) => handleInputChange('interestedMaterials', e.target.value)}
            >
              <option value="" style={{ background: '#1f2937', color: 'white' }}>Select material type</option>
              <option value="metal" style={{ background: '#1f2937', color: 'white' }}>Metal Scrap</option>
              <option value="plastic" style={{ background: '#1f2937', color: 'white' }}>Plastic Waste</option>
              <option value="paper" style={{ background: '#1f2937', color: 'white' }}>Paper & Cardboard</option>
              <option value="textile" style={{ background: '#1f2937', color: 'white' }}>Textile Waste</option>
              <option value="ewaste" style={{ background: '#1f2937', color: 'white' }}>Electronic Waste</option>
              <option value="all" style={{ background: '#1f2937', color: 'white' }}>All Types</option>
            </select>

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <FileText size={14} /> Business License / ID Proof *
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              required
              style={{...inputStyle, padding: "12px 16px"}}
              onChange={(e) => handleFileUpload('businessLicense', e.target.files[0])}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.7)",
              fontWeight: '500'
            }}>
              <CreditCard size={14} /> PAN / GST Number (Optional for business sellers)
            </label>
            <input
              type="text"
              placeholder="PAN or GST Number"
              style={{...inputStyle, marginBottom: "24px"}}
              onChange={(e) => handleInputChange('panGst', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <GlassButton type="submit" variant="primary">
              Register as Seller
            </GlassButton>
          </form>
        </div>
      </div>
    </div>
  );
}
  
// Add this section after the Seller Registration Form and before the Transport Partner section

// Buyer Registration Form
if (currentStep === 'buyer') {
  return (
    <div style={backgroundStyle}>
      <NavHeader />
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        paddingTop: "100px",
        paddingBottom: "40px"
      }}>
        <div style={glassContainerStyle}>
          <GlassButton 
            variant="back" 
            onClick={() => setCurrentStep('selection')}
          >
            <ChevronLeft size={16} /> Back to Selection
          </GlassButton>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{
              padding: '12px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingCart size={24} color="white" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: '600' }}>Buyer Registration</h2>
              <p style={{ margin: '4px 0 0 0', color: "rgba(255,255,255,0.8)", fontSize: '0.9rem' }}>
                Register as a waste material buyer/recycler
              </p>
            </div>
          </div>

          <form onSubmit={(e) => handleSubmit(e, 'Buyer')}>
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Mail size={14} /> Email ID *
            </label>
            <input
              type="email"
              placeholder="your-business@example.com"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />
<label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
  <Lock size={14} />
  Password
</label>
<input
  type="password"
  placeholder="Create a secure password"
  required
  style={inputStyle}
  onChange={(e) => handleInputChange('password', e.target.value)}
  onFocus={(e) => {
    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
  }}
  onBlur={(e) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }}
/>

<label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
  <Lock size={14} />
  Confirm Password
</label>
<input
  type="password"
  placeholder="Confirm your password"
  required
  style={inputStyle}
  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
  onFocus={(e) => {
    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
  }}
  onBlur={(e) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }}
/>

          

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <User size={14} /> Full Name / Company Name *
            </label>
            <input
              type="text"
              placeholder="Your Name or Company Name"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Phone size={14} /> Contact Number *
            </label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              required
              style={inputStyle}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <MapPin size={14} /> Address / Location *
            </label>
            <textarea
              placeholder="Complete address"
              required
              style={{...inputStyle, minHeight: "80px", resize: "vertical", fontFamily: "inherit"}}
              onChange={(e) => handleInputChange('address', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Package size={14} /> Materials You're Interested In *
            </label>
            <select
              style={inputStyle}
              required
              onChange={(e) => handleInputChange('interestedMaterials', e.target.value)}
            >
              <option value="" style={{ background: '#1f2937', color: 'white' }}>Select material type</option>
              <option value="metal" style={{ background: '#1f2937', color: 'white' }}>Metal Scrap</option>
              <option value="plastic" style={{ background: '#1f2937', color: 'white' }}>Plastic Waste</option>
              <option value="paper" style={{ background: '#1f2937', color: 'white' }}>Paper & Cardboard</option>
              <option value="textile" style={{ background: '#1f2937', color: 'white' }}>Textile Waste</option>
              <option value="ewaste" style={{ background: '#1f2937', color: 'white' }}>Electronic Waste</option>
              <option value="all" style={{ background: '#1f2937', color: 'white' }}>All Types</option>
            </select>

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <FileText size={14} /> Business License / ID Proof *
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              required
              style={{...inputStyle, padding: "12px 16px"}}
              onChange={(e) => handleFileUpload('businessLicense', e.target.files[0])}
            />

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.7)",
              fontWeight: '500'
            }}>
              <CreditCard size={14} /> PAN / GST Number (Optional for business buyers)
            </label>
            <input
              type="text"
              placeholder="PAN or GST Number"
              style={{...inputStyle, marginBottom: "24px"}}
              onChange={(e) => handleInputChange('panGst', e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            <GlassButton type="submit" variant="primary">
              Register as Buyer
            </GlassButton>
          </form>
        </div>
      </div>
    </div>
  );
}

  // Transportation Partner Registration Form
  if (currentStep === 'transport') {
    return (
      <div style={backgroundStyle}>
        <NavHeader />
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          paddingTop: "100px",
          paddingBottom: "40px"
        }}>
          <div style={glassContainerStyle}>
            <GlassButton 
              variant="back" 
              onClick={() => setCurrentStep('selection')}
            >
              <ChevronLeft size={16} /> Back to Selection
            </GlassButton>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Truck size={24} color="white" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: '600' }}>Transport Partner Registration</h2>
                <p style={{ margin: '4px 0 0 0', color: "rgba(255,255,255,0.8)", fontSize: '0.9rem' }}>
                  Register as a transportation service provider
                </p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e, 'Transport Partner')}>
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <Mail size={14} /> Email ID *
              </label>
              <input
                type="email"
                placeholder="transport@example.com"
                required
                style={inputStyle}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <Lock size={14} /> Password *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                style={inputStyle}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <Building size={14} /> Transport Company / Owner Name *
              </label>
              <input
                type="text"
                placeholder="Company or Owner Name"
                required
                style={inputStyle}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <Phone size={14} /> Contact Number *
              </label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                required
                style={inputStyle}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <MapPin size={14} /> Service Regions *
              </label>
              <textarea
                placeholder="States or cities you provide service to"
                required
                style={{...inputStyle, minHeight: "80px", resize: "vertical", fontFamily: "inherit"}}
                onChange={(e) => handleInputChange('serviceRegions', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <Truck size={14} /> Vehicle Type *
              </label>
              <select
                style={inputStyle}
                required
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
              >
                <option value="" style={{ background: '#1f2937', color: 'white' }}>Select vehicle type</option>
                <option value="truck" style={{ background: '#1f2937', color: 'white' }}>Truck</option>
                <option value="mini-truck" style={{ background: '#1f2937', color: 'white' }}>Mini Truck</option>
                <option value="pickup" style={{ background: '#1f2937', color: 'white' }}>Pickup Vehicle</option>
                <option value="container" style={{ background: '#1f2937', color: 'white' }}>Container Truck</option>
                <option value="multiple" style={{ background: '#1f2937', color: 'white' }}>Multiple Vehicles</option>
              </select>

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <Package size={14} /> Vehicle Capacity (in tons) *
              </label>
              <input
                type="number"
                placeholder="e.g., 5"
                required
                style={inputStyle}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <CreditCard size={14} /> Vehicle Registration Number *
              </label>
              <input
                type="text"
                placeholder="e.g., MH 01 AB 1234"
                required
                style={inputStyle}
                onChange={(e) => handleInputChange('vehicleRegistration', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <FileText size={14} /> Driver License Copy *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                required
                style={{...inputStyle, padding: "12px 16px"}}
                onChange={(e) => handleFileUpload('driverLicense', e.target.files[0])}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.9)",
                fontWeight: '500'
              }}>
                <CreditCard size={14} /> Transport License / Permit *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                required
                style={{...inputStyle, padding: "12px 16px"}}
                onChange={(e) => handleFileUpload('transportLicense', e.target.files[0])}
              />

              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginBottom: 8, 
                fontSize: 14, 
                color: "rgba(255,255,255,0.7)",
                fontWeight: '500'
              }}>
                <FileText size={14} /> GST / PAN (Optional for registered businesses)
              </label>
              <input
                type="text"
                placeholder="GST or PAN Number"
                style={{...inputStyle, marginBottom: "24px"}}
                onChange={(e) => handleInputChange('gstPan', e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />

              <GlassButton type="submit" variant="primary">
                Register as Transport Partner
              </GlassButton>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SignUpPage;