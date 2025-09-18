import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Phone, Mail, User, Shield, Truck, Calculator, CheckCircle, Clock, Package } from 'lucide-react';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing Address
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    
    // Shipping Address
    sameAsBilling: true,
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    
    // Payment
    paymentMethod: 'upi',
    saveDetails: false
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Mock cart data (would come from context/props in real app)
  const cartItems = [
    {
      id: 1,
      name: 'Premium Copper Wire Scrap',
      seller: 'MetalCorp Industries',
      pricePerKg: 850,
      quantity: 50,
      image: '/api/placeholder/80/80',
      total: 42500
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const gst = Math.round(subtotal * 0.18);
  const shippingCharges = subtotal > 10000 ? 0 : 500;
  const finalAmount = subtotal + gst + shippingCharges;

  const backgroundStyle = {
    minHeight: "100vh",
    background: `linear-gradient(135deg, rgba(74, 144, 226, 0.3) 0%, rgba(155, 81, 224, 0.3) 100%), 
                 linear-gradient(45deg, #667eea 0%, #764ba2 100%)`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  };

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    setOrderPlaced(true);
  };

  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', gap: '16px' }}>
      {[
        { step: 1, label: 'Order Review' },
        { step: 2, label: 'Customer Info' },
        { step: 3, label: 'Payment' }
      ].map(({ step, label }) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: currentStep >= step ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            border: `2px solid ${currentStep >= step ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentStep >= step ? '#10b981' : 'rgba(255, 255, 255, 0.6)',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {currentStep > step ? <CheckCircle size={16} /> : step}
          </div>
          <span style={{ 
            color: currentStep >= step ? 'white' : 'rgba(255, 255, 255, 0.6)', 
            fontSize: '14px', 
            fontWeight: '500' 
          }}>
            {label}
          </span>
          {step < 3 && (
            <div style={{ 
              width: '40px', 
              height: '2px', 
              backgroundColor: currentStep > step ? '#10b981' : 'rgba(255, 255, 255, 0.2)',
              marginLeft: '8px' 
            }}></div>
          )}
        </div>
      ))}
    </div>
  );

  const OrderSummary = () => (
    <div style={glassCardStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 24px 0' }}>Order Summary</h3>
      
      {/* Cart Items */}
      <div style={{ marginBottom: '24px' }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            marginBottom: '12px'
          }}>
            <img 
              src={item.image} 
              alt={item.name}
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '8px', 
                objectFit: 'cover',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>{item.name}</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 8px 0' }}>by {item.seller}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>₹{item.pricePerKg}/kg</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>×</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{item.quantity}kg</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0' }}>₹{item.total.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Subtotal</span>
          <span style={{ color: 'white' }}>₹{subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>GST (18%)</span>
          <span style={{ color: 'white' }}>₹{gst.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Shipping</span>
          <span style={{ color: shippingCharges === 0 ? '#10b981' : 'white' }}>
            {shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}
          </span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          paddingTop: '16px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
        }}>
          <span style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Total Amount</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>₹{finalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  const CustomerInfoForm = () => (
    <div style={glassCardStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 24px 0' }}>Customer Information</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            style={inputStyle}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            style={inputStyle}
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          style={inputStyle}
          placeholder="Enter email address"
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          style={inputStyle}
          placeholder="Enter phone number"
        />
      </div>

      {/* Billing Address */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} />
          Billing Address
        </h4>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Address *
          </label>
          <textarea
            value={formData.billingAddress}
            onChange={(e) => handleInputChange('billingAddress', e.target.value)}
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
            placeholder="Enter complete address"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              City *
            </label>
            <input
              type="text"
              value={formData.billingCity}
              onChange={(e) => handleInputChange('billingCity', e.target.value)}
              style={inputStyle}
              placeholder="City"
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              State *
            </label>
            <input
              type="text"
              value={formData.billingState}
              onChange={(e) => handleInputChange('billingState', e.target.value)}
              style={inputStyle}
              placeholder="State"
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Pincode *
            </label>
            <input
              type="text"
              value={formData.billingPincode}
              onChange={(e) => handleInputChange('billingPincode', e.target.value)}
              style={inputStyle}
              placeholder="Pincode"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address Toggle */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          cursor: 'pointer',
          color: 'white',
          fontSize: '14px'
        }}>
          <input
            type="checkbox"
            checked={formData.sameAsBilling}
            onChange={(e) => handleInputChange('sameAsBilling', e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          Shipping address is same as billing address
        </label>
      </div>

      {!formData.sameAsBilling && (
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} />
            Shipping Address
          </h4>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Address *
            </label>
            <textarea
              value={formData.shippingAddress}
              onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
              style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
              placeholder="Enter shipping address"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                City *
              </label>
              <input
                type="text"
                value={formData.shippingCity}
                onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                style={inputStyle}
                placeholder="City"
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                State *
              </label>
              <input
                type="text"
                value={formData.shippingState}
                onChange={(e) => handleInputChange('shippingState', e.target.value)}
                style={inputStyle}
                placeholder="State"
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Pincode *
              </label>
              <input
                type="text"
                value={formData.shippingPincode}
                onChange={(e) => handleInputChange('shippingPincode', e.target.value)}
                style={inputStyle}
                placeholder="Pincode"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const PaymentMethods = () => (
    <div style={glassCardStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CreditCard size={18} />
        Payment Method
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {[
          { id: 'upi', label: 'UPI', desc: 'PhonePe, Google Pay, Paytm' },
          { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
          { id: 'netbanking', label: 'Net Banking', desc: 'All major banks supported' },
          { id: 'wallet', label: 'Digital Wallets', desc: 'Paytm, PhonePe, Amazon Pay' },
          { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive' }
        ].map((method) => (
          <label
            key={method.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '12px',
              border: formData.paymentMethod === method.id 
                ? '2px solid #10b981' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: formData.paymentMethod === method.id 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(255, 255, 255, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={formData.paymentMethod === method.id}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              style={{ width: '18px', height: '18px' }}
            />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>
                {method.label}
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {method.desc}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          cursor: 'pointer',
          color: 'white',
          fontSize: '14px'
        }}>
          <input
            type="checkbox"
            checked={formData.saveDetails}
            onChange={(e) => handleInputChange('saveDetails', e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          Save payment details for future purchases
        </label>
      </div>

      <div style={{ 
        padding: '16px', 
        backgroundColor: 'rgba(16, 185, 129, 0.1)', 
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Shield size={16} style={{ color: '#10b981' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>Secure Payment</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', margin: '0' }}>
          Your payment information is encrypted and secure. Powered by Razorpay.
        </p>
      </div>
    </div>
  );

  const OrderSuccess = () => (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={glassCardStyle}>
        <div style={{ marginBottom: '24px' }}>
          <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', margin: '0' }}>
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Order ID</p>
              <p style={{ color: 'white', fontWeight: '600', margin: '0' }}>#EP2025{Math.floor(Math.random() * 10000)}</p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Total Amount</p>
              <p style={{ color: '#10b981', fontWeight: '600', margin: '0' }}>₹{finalAmount.toLocaleString()}</p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Payment Method</p>
              <p style={{ color: 'white', fontWeight: '600', margin: '0' }}>
                {formData.paymentMethod.toUpperCase()}
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 4px 0' }}>Estimated Delivery</p>
              <p style={{ color: 'white', fontWeight: '600', margin: '0' }}>3-5 Business Days</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <GlassButton variant="primary" style={{ padding: '12px 24px' }}>
            Track Order
          </GlassButton>
          <GlassButton variant="secondary" style={{ padding: '12px 24px' }}>
            Continue Shopping
          </GlassButton>
        </div>
      </div>
    </div>
  );

  if (orderPlaced) {
    return (
      <div style={backgroundStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <OrderSuccess />
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          marginBottom: '32px',
          padding: '0 20px'
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0' }}>Checkout</h1>
            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', margin: '0' }}>
              Complete your order securely
            </p>
          </div>
        </div>

        <StepIndicator />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', alignItems: 'start' }}>
          {/* Main Content */}
          <div>
            {currentStep === 1 && (
              <div>
                <div style={glassCardStyle}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: '0 0 24px 0' }}>
                    Review Your Order
                  </h3>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      padding: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '8px', 
                          objectFit: 'cover',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 8px 0' }}>
                          by {item.seller}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px' }}>
                          <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>₹{item.pricePerKg}/kg</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>×</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{item.quantity}kg</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', margin: '0' }}>
                          ₹{item.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '24px' }}>
                    <GlassButton 
                      onClick={() => setCurrentStep(2)} 
                      variant="primary" 
                      style={{ width: '100%', padding: '16px' }}
                    >
                      Continue to Customer Information
                    </GlassButton>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <CustomerInfoForm />
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                  <GlassButton 
                    onClick={() => setCurrentStep(1)} 
                    variant="secondary" 
                    style={{ flex: 1, padding: '16px' }}
                  >
                    Back to Order Review
                  </GlassButton>
                  <GlassButton 
                    onClick={() => setCurrentStep(3)} 
                    variant="primary" 
                    style={{ flex: 1, padding: '16px' }}
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                  >
                    Continue to Payment
                  </GlassButton>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <PaymentMethods />
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                  <GlassButton 
                    onClick={() => setCurrentStep(2)} 
                    variant="secondary" 
                    style={{ flex: 1, padding: '16px' }}
                  >
                    Back to Customer Info
                  </GlassButton>
                  <GlassButton 
                    onClick={handlePlaceOrder} 
                    variant="primary" 
                    style={{ flex: 1, padding: '16px' }}
                  >
                    Place Order - ₹{finalAmount.toLocaleString()}
                  </GlassButton>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div style={{ position: 'sticky', top: '20px' }}>
            <OrderSummary />
            
            {/* Security Info */}
            <div style={{ 
              ...glassCardStyle, 
              marginTop: '24px', 
              textAlign: 'center',
              padding: '20px'
            }}>
              <Shield size={24} style={{ color: '#10b981', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: '0 0 8px 0' }}>
                Secure Checkout
              </h4>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', margin: '0' }}>
                256-bit SSL encryption protects your personal information
              </p>
            </div>

            {/* Support Info */}
            <div style={{ 
              ...glassCardStyle, 
              marginTop: '16px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Phone size={18} style={{ color: '#10b981' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: '0' }}>Need Help?</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', margin: '0' }}>Call us at +91-XXXX-XXXX</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} style={{ color: '#10b981' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: '0' }}>Email Support</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', margin: '0' }}>support@ecopulse.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;