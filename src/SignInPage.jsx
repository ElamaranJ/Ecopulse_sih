// src/SignInPage.jsx
import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, Recycle } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import bg from './assets/space.jpg';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Use the same background style as HomePage and SignUpPage
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
    maxWidth: '420px',
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

  // Navigation Header matching HomePage
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
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer'
          }} onClick={() => navigate('/')}>
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

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in with', email, password);
    // Navigate to homepage after successful sign in
    navigate('/');
  };

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
          {/* Back button */}
          <GlassButton 
            variant="back" 
            onClick={() => navigate('/')}
            style={{ marginBottom: '24px' }}
          >
            <ChevronLeft size={16} />
            Back to Home
          </GlassButton>

          {/* Header */}
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
              Welcome Back
            </h2>
            <p style={{ 
              margin: 0, 
              color: "rgba(255,255,255,0.85)", 
              fontSize: '1.1rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              Sign in to your EcoPulse account
            </p>
          </div>

          <form onSubmit={handleSignIn}>
            {/* Email Field */}
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />

            {/* Password Field */}
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              marginBottom: 8, 
              fontSize: 14, 
              color: "rgba(255,255,255,0.9)",
              fontWeight: '500'
            }}>
              <Lock size={14} /> Password
            </label>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{...inputStyle, marginBottom: 0, paddingRight: '45px'}}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  padding: '4px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Sign In Button */}
            <GlassButton type="submit" variant="primary" style={{ marginBottom: '20px' }}>
              Sign In to EcoPulse
            </GlassButton>
          </form>
          
          {/* Sign Up Link */}
          <div style={{ 
            marginTop: '24px', 
            fontSize: '14px', 
            color: "rgba(255,255,255,0.75)", 
            textAlign: "center" 
          }}>
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              style={{ 
                color: "rgba(16, 185, 129, 0.95)", 
                textDecoration: "underline",
                fontWeight: '600'
              }}
            >
              Sign Up
            </Link>
          </div>

          {/* Forgot Password Link */}
          <div style={{ 
            marginTop: '16px', 
            fontSize: '13px', 
            color: "rgba(255,255,255,0.6)", 
            textAlign: "center" 
          }}>
            <Link 
              to="/forgot-password" 
              style={{ 
                color: "rgba(255, 255, 255, 0.8)", 
                textDecoration: "underline"
              }}
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
