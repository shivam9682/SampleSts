import React, { useState } from 'react';
import './Contact.css'; // assume we provide CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // clear field error on change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      console.log('Form data submitted:', formData);
      setSubmitted(true);
      // Optionally reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-headerr">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out with any questions or feedback.</p>
      </div>

      <div className="contact-gridd">
        {/* Library Information Section */}
        <div className="info-sectionn">
          <div className="info-cardd">
            <h2>Library Information</h2>
            <div className="info-detaill">
              <span className="info-icon">📍</span>
              <div>
                <h3>Address</h3>
                <p>123 Engineering Chauraha,Lucknow, BT 45678</p>
                <a href="https://maps.app.goo.gl/F6Ui424Bv4pXWRF48" target="_blank" rel="noopener noreferrer">View on Map</a>
              </div>
            </div>
            <div className="info-detail">
              <span className="info-icon">📞</span>
              <div>
                <h3>Phone</h3>
                <p><a href="tel:+919682957154">+91 9682957154 </a></p>
              </div>
            </div>
            <div className="info-detail">
              <span className="info-icon">✉️</span>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:ssivamyadav0123@gmail.com">ssivamyadav0123@gmail.com</a></p>
              </div>
            </div>
            <div className="info-detail">
              <span className="info-icon">🕒</span>
              <div>
                <h3>Opening Hours</h3>
                <ul className="hours-list">
                  <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                  <li>Saturday: 10:00 AM - 6:00 PM</li>
                  <li>Sunday: 12:00 PM - 5:00 PM</li>
                </ul>
              </div>
            </div>
            <div className="info-detail">
              <span className="info-icon">🌐</span>
              <div>
                <h3>Social Media</h3>
                <div className="social-linkss">
                  <a href="#" target="_blank">Facebook</a>
                  <a href="#" target="_blank">Twitter</a>
                  <a href="#" target="_blank">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2>Send a Message</h2>
            {submitted && <div className="success-message">Thank you! Your message has been sent. We'll get back to you soon.</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error-input' : ''}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error-input' : ''}
                ></textarea>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section (optional) */}
      <div className="map-section">
        <h2>Find Us</h2>
        <div className="map-placeholder">
          {/* You can embed Google Maps iframe here */}
          <iframe
            title="Library Location"
            src="https://maps.google.com/maps?q=123%20Knowledge%20Street%2C%20Booktown&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;