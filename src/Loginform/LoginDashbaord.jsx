import React from 'react';
import { Link } from 'react-router-dom';

const LoginDashBoard = () => {

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* ✅ Home Button */}
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <Link to="/">
            <button style={styles.homeButton}>🏠 Home</button>
          </Link>
        </div>

        <h1 style={styles.title}>📚 Library Management System</h1>
        <p style={styles.subtitle}>Please select your login type</p>

        <div style={styles.buttonGroup}>
          <Link to="/login">
            <button style={styles.userButton}>
              User Login
            </button>
          </Link> 

          <Link to="/adminLogin"> 
            <button style={styles.adminButton}>
              Admin Login
            </button>
          </Link>
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

  // ✅ Home Button Style
  homeButton: {
    padding: '6px 12px',
    fontSize: '0.9rem',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
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
  },
};

export default LoginDashBoard;