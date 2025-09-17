import React from 'react';
import { Shield, BarChart3, Globe, Award, Recycle, Leaf, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import bg from './assets/space.jpg'; // Assuming you have the same background
import { useNavigate } from "react-router-dom";
import BHARATH from './assets/BHARATH.jpg';
import maran from './assets/ELAMARAN.jpg';
import Balaji from './assets/balaji.jpg';
import gopi from './assets/gopinath.jpg';
// Reusing GlassCard for consistent styling
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

// GlassButton component definition, reused from the initial code
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


const AboutPage = () => {
    const navigate = useNavigate();

    // Reusing data from HomePage for consistency
    const stats = [
        { label: 'Waste Processed', value: '50,000+', unit: 'tons', icon: Recycle, color: '#10b981' },
        { label: 'Active Partners', value: '15,000+', unit: 'users', icon: Users, color: '#3b82f6' },
        { label: 'Carbon Reduced', value: '120,000', unit: 'kg CO₂', icon: Leaf, color: '#059669' },
        { label: 'Revenue Generated', value: '₹45.2', unit: 'crores', icon: TrendingUp, color: '#8b5cf6' }
    ];

    const features = [
        { icon: Shield, title: 'Verified Sellers', desc: 'All partners undergo rigorous verification to ensure quality and compliance.' },
        { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track your sustainability metrics, environmental impact, and financial returns.' },
        { icon: Globe, title: 'Global Network', desc: 'Connect with a growing network of industries and recyclers across India and beyond.' },
        { icon: Award, title: 'Quality Assured', desc: 'Our platform ensures premium material quality with transparent sourcing and guarantees.' }
    ];

    const team = [
        { name: 'BALAJI.T', role: 'FRONT-END DEVELOPER', specialty: 'User interface & experience.', photo: Balaji },
        { name: 'BHARATH.K', role: 'BACK-END DEVELOPER', specialty: 'Server logic & APIs.', photo: BHARATH },
        { name: 'GOPINATH.S', role: 'DESIGNER', specialty: 'Visual design & user flow.', photo: gopi },
        { name: 'ELAMARAN.J', role: 'DATABASE MANAGER', specialty: 'Data storage & security.', photo: maran },
    ];

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
            {/* Back Button */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1000,
            }}>
                <GlassButton onClick={() => navigate(-1)} className="p-2 w-auto h-auto">
                    <ArrowLeft size={24} color="rgba(255, 255, 255, 0.9)" />
                </GlassButton>
            </div>
            
            {/* Main Content Sections */}
            <div style={{ paddingTop: '60px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
                    
                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
                            About EcoPulse
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            maxWidth: '800px',
                            margin: '0 auto',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                        }}>
                            Pioneering a new era of sustainability by transforming industrial waste into valuable resources through our AI-powered marketplace.
                        </p>
                    </div>

                    {/* Spacing */}
                    <div style={{ height: '40px' }} />

                    {/* Mission & Vision */}
                    <GlassCard style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '20px' }}>Our Mission & Vision</h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Our mission is to build a **circular economy** by providing a seamless, transparent, and efficient platform for trading recyclable materials. We envision a future where waste is not discarded but seen as a resource, creating economic value and a sustainable planet for generations to come. Through technology and a collaborative community, we aim to eliminate waste, one transaction at a time.
                        </p>
                    </GlassCard>

                    {/* Spacing */}
                    <div style={{ height: '40px' }} />

                    {/* Key Features */}
                    <GlassCard style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '30px', textAlign: 'center' }}>Key Features</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            textAlign: 'center'
                        }}>
                            {features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div key={index} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
                                            marginBottom: '16px'
                                        }}>
                                            <IconComponent size={24} color="#764ba2" />
                                        </div>
                                        <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>{feature.title}</h3>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>{feature.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>

                    {/* Spacing */}
                    <div style={{ height: '40px' }} />

                    {/* Impact Stats */}
                    <GlassCard style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '30px', textAlign: 'center' }}>Our Impact So Far</h2>
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

                    {/* Spacing */}
                    <div style={{ height: '40px' }} />

                    {/* Team Section */}
                    <GlassCard style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '30px', textAlign: 'center' }}>Meet the Team</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '20px',
                            textAlign: 'center'
                        }}>
                            {team.map((member, index) => (
                                <div key={index} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                    {/* Placeholder for the team member's photo */}
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        border: '3px solid rgba(255, 255, 255, 0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        overflow: 'hidden'
                                    }}>
                                       {member.photo ? (
        <img 
            src={member.photo} 
            alt={member.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
    ) : (
        "Photo Here"
    )}
                                    </div>
                                    <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>{member.name}</h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '8px' }}>{member.role}</p>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', fontStyle: 'italic' }}>{member.specialty}</p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;