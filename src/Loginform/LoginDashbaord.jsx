import React from 'react';
import { Link } from 'react-router-dom';

const LoginDashBoard = () => {
  const handleUserLogin = () => {
   // alert('User Login clicked – redirect to user dashboard');
    // e.g., window.location.href = '/user-dashboard';
  };

  const handleAdminLogin = () => {
   // alert('Admin Login clicked – redirect to admin panel');
    // e.g., window.location.href = '/admin-dashboard';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📚 Library Management System</h1>
        <p style={styles.subtitle}>Please select your login type</p>
        <div style={styles.buttonGroup}>
             <Link to="/login">
          <button style={styles.userButton} onClick={handleUserLogin}>
            User Login
          </button> </Link> 
          <Link to="/adminLogin" > 
          <button style={styles.adminButton} onClick={handleAdminLogin}>
            Admin Login
          </button>  </Link>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '320px',
  },
  title: {
    marginBottom: '0.5rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  subtitle: {
    marginBottom: '2rem',
    color: '#666',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  userButton: {
    padding: '12px',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  adminButton: {
    padding: '12px',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

// Add hover effects using JavaScript (optional but keeps pure React)
// You can also use a <style> tag or CSS classes for hover.
// For simplicity, we'll attach onMouseEnter/Leave to simulate hover.
// Alternatively, add these styles to a <style> block.
const enhancedStyles = { ...styles };
enhancedStyles.userButton = {
  ...styles.userButton,
  ':hover': { backgroundColor: '#45a049' },
};
enhancedStyles.adminButton = {
  ...styles.adminButton,
  ':hover': { backgroundColor: '#0b7dda' },
};

export default LoginDashBoard;