import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Instagram, Youtube, ArrowLeft } from 'lucide-react';
import bg from './assets/space.jpg';
import { useNavigate } from "react-router-dom";

// Leaflet imports and marker fix
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Reusing GlassCard and GlassButton for consistent styling
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

const ContactPage = () => {
    const navigate = useNavigate();

    // Coordinates for R.M.D Engineering College, Kavarapettai
    const collegeCoordinates = [13.2297, 80.1109];

    // Custom icon that's just a text label for college name
    const customTextIcon = L.divIcon({
      className: 'custom-text-marker',
      html: `<div style="color: black; font-weight: bold; font-size: 1rem; text-shadow: 1px 1px 3px rgba(255,255,255,0.5); background: rgba(255,255,255,0.8); padding: 4px 8px; border-radius: 6px; border: 1px solid #ccc;">R.M.D Engineering College</div>`,
      iconAnchor: [80, 15], // Center the text label
    });

    const socialLinks = [
        { icon: Linkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/elamaran-j-a4ab8b32a/' },
        { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/a_l_o_n_e_maran___/' },
        { icon: Youtube, name: 'YouTube', url: 'https://youtu.be/IjWWnDZlezI?feature=shared' }
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
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                            Contact Us
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            maxWidth: '800px',
                            margin: '0 auto',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                        }}>
                            We'd love to hear from you! Reach out to our team with any questions or inquiries.
                        </p>
                    </div>

                    {/* Spacing */}
                    <div style={{ height: '40px' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'flex-start' }}>
                        {/* Contact Form Section */}
                        <GlassCard>
                            <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>Send us a message</h2>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    style={{
                                        padding: '16px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    style={{
                                        padding: '16px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows="5"
                                    style={{
                                        padding: '16px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                />
                                <GlassButton type="submit" className="w-full">
                                    Send Message
                                </GlassButton>
                            </form>
                        </GlassCard>

                        {/* Company Info, Social Links */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <GlassCard>
                                <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>Our Location</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                    <MapPin size={24} color="#a8edea" />
                                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                                        R.M.D Engineering College, R.S.M. Nagar, Kavarapettai, Gummidipoondi, Tiruvallur, Tamil Nadu - 601206
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                    <Phone size={24} color="#fed6e3" />
                                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                                        +91 7299273747
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <Mail size={24} color="#a8edea" />
                                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                                      ecopulse@gmail.com
                                    </p>
                                </div>
                            </GlassCard>

                            <GlassCard>
                                <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>Find us on Social Media</h2>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                    {socialLinks.map((link, index) => {
                                        const IconComponent = link.icon;
                                        return (
                                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                <GlassButton className="p-3">
                                                    <IconComponent size={24} />
                                                </GlassButton>
                                            </a>
                                        );
                                    })}
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Spacing */}
                    <div style={{ height: '40px' }} />

                    {/* Map Section */}
                    <GlassCard>
                        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>Office Location Map</h2>
                        <div
                            style={{
                                width: '100%',
                                height: '400px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.cursor = 'grab';
                                // Disable page scroll when hovering over map
                                document.body.style.overflow = 'hidden';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.cursor = 'default';
                                // Re-enable page scroll when leaving map
                                document.body.style.overflow = 'auto';
                            }}
                        >
                            <MapContainer
                                center={collegeCoordinates}
                                zoom={15}
                                scrollWheelZoom={true}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={collegeCoordinates} icon={customTextIcon} />
                        </MapContainer>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;