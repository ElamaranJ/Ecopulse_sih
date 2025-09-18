// src/components/ChatBot/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap } from 'lucide-react';
import { findBestResponse, formatMessage, quickActions } from './chatBotUtils';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    formatMessage("Hi! 👋 I'm your EcoPulse assistant! I can help you with buying materials, tracking orders, payments, and more. What would you like to know?", false)
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Glassmorphism styles matching your design
  const chatContainerStyle = {
    position: 'fixed',
    bottom: '100px',
    right: '24px',
    width: '380px',
    height: '600px',
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
  };

  const headerStyle = {
    padding: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const messagesStyle = {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
  };

  const inputContainerStyle = {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    gap: '8px',
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  };

  const sendButtonStyle = {
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  const messageStyle = (isUser) => ({
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    flexDirection: isUser ? 'row-reverse' : 'row',
    animation: 'slideIn 0.3s ease',
  });

  const messageBubbleStyle = (isUser) => ({
    maxWidth: '75%',
    padding: '12px 16px',
    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    backgroundColor: isUser 
      ? 'rgba(16, 185, 129, 0.8)' 
      : 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    fontSize: '14px',
    lineHeight: '1.4',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    wordBreak: 'break-word',
  });

  const avatarStyle = (isUser) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: isUser ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  });

  const quickActionStyle = {
    display: 'inline-block',
    margin: '4px',
    padding: '8px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  const typingIndicatorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '18px 18px 18px 4px',
    maxWidth: '75%',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = formatMessage(inputValue, true);
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = findBestResponse(inputValue);
      const botMessage = formatMessage(botResponse, false);
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
  };

  const handleQuickAction = (actionText) => {
    setInputValue(actionText);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={chatContainerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        }}>
          <Bot size={20} color="white" />
        </div>
        <div>
          <h3 style={{ color: 'white', margin: '0', fontSize: '16px', fontWeight: '600' }}>
            EcoPulse Assistant
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '12px' }}>
            Online • Ready to help
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
          <Sparkles size={16} color="rgba(255, 255, 255, 0.6)" />
          <Zap size={16} color="rgba(255, 255, 255, 0.6)" />
        </div>
      </div>

      {/* Messages */}
      <div style={messagesStyle}>
        {messages.map((message) => (
          <div key={message.id} style={messageStyle(message.isUser)}>
            <div style={avatarStyle(message.isUser)}>
              {message.isUser ? (
                <User size={16} color="rgba(255, 255, 255, 0.8)" />
              ) : (
                <Bot size={16} color="rgba(255, 255, 255, 0.8)" />
              )}
            </div>
            <div>
              <div style={messageBubbleStyle(message.isUser)}>
                {message.text}
              </div>
              <div style={{ 
                fontSize: '10px', 
                color: 'rgba(255, 255, 255, 0.5)', 
                marginTop: '4px',
                textAlign: message.isUser ? 'right' : 'left' 
              }}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div style={messageStyle(false)}>
            <div style={avatarStyle(false)}>
              <Bot size={16} color="rgba(255, 255, 255, 0.8)" />
            </div>
            <div style={typingIndicatorStyle}>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>EcoPulse is typing</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.6)', animation: 'bounce 1.4s ease-in-out infinite both' }}></div>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.6)', animation: 'bounce 1.4s ease-in-out 0.16s infinite both' }}></div>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.6)', animation: 'bounce 1.4s ease-in-out 0.32s infinite both' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div style={{ margin: '16px 0' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', marginBottom: '8px' }}>
              Quick questions:
            </p>
            <div>
              {quickActions.map((action, index) => (
                <span
                  key={index}
                  style={quickActionStyle}
                  onClick={() => handleQuickAction(action.text)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {action.icon} {action.text}
                </span>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={inputContainerStyle}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about EcoPulse..."
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
        <button
          onClick={handleSendMessage}
          style={sendButtonStyle}
          disabled={!inputValue.trim()}
          onMouseEnter={(e) => {
            if (!e.target.disabled) {
              e.target.style.backgroundColor = 'rgba(16, 185, 129, 1)';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.8)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <Send size={16} />
        </button>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
