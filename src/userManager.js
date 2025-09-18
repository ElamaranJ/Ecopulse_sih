// src/userManager.js

// User management utilities
export const userManager = {
  // Register a new user
  registerUser: (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('ecopulse_users') || '[]');
    
    // Check if user already exists
    const userExists = existingUsers.find(user => user.email === userData.email);
    if (userExists) {
      return { success: false, message: 'User with this email already exists!' };
    }
    
    // Add registration date
    userData.registrationDate = new Date().toISOString();
    
    // Add new user
    existingUsers.push(userData);
    localStorage.setItem('ecopulse_users', JSON.stringify(existingUsers));
    
    return { success: true, message: 'Registration successful!' };
  },

  // Authenticate user login
  authenticateUser: (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('ecopulse_users') || '[]');
    const user = existingUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('ecopulse_current_user', JSON.stringify(user));
      return { success: true, user: user };
    }
    
    return { success: false, message: 'Invalid credentials' };
  },

  // Get current logged in user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('ecopulse_current_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout user
  logoutUser: () => {
    localStorage.removeItem('ecopulse_current_user');
  },

  // Get all users (for admin purposes)
  getAllUsers: () => {
    return JSON.parse(localStorage.getItem('ecopulse_users') || '[]');
  }
};
