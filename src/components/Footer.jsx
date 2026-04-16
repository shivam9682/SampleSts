import React from 'react'

export default function Footer() {
  return (
    <div>
       <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            <span className="logo-icon">📚</span>
            <span>LibraSys</span>
          </div>
          <p>Empowering minds through knowledge and community since 2025.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Membership</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>📍 123 Library Ave, Booktown</li>
            <li>📞 (555) 123-4567</li>
            <li>✉️ hello@librasys.com</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>🐦 Twitter</span>
            <span>📘 Facebook</span>
            <span>📸 Instagram</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LibraSys – Library Management System. All rights reserved.</p>
      </div>
    </footer>
    </div>
  )
}
