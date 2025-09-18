// src/components/ChatBot/ChatBotButton.jsx
import React from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatBotButton = ({ isOpen, onClick, unreadCount = 0 }) => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
  };

  const iconStyle = {
    color: 'white',
    transition: 'all 0.3s ease',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    transform: unreadCount > 0 ? 'scale(1)' : 'scale(0)',
    transition: 'transform 0.3s ease',
  };

  return (
    <div
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.transform = isOpen ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1.1)';
        e.target.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = isOpen ? 'rotate(90deg) scale(1)' : 'rotate(0deg) scale(1)';
        e.target.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
      }}
    >
      {isOpen ? (
        <X size={24} style={iconStyle} />
      ) : (
        <MessageCircle size={24} style={iconStyle} />
      )}
      
      {unreadCount > 0 && (
        <div style={badgeStyle}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
