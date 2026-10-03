import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message sent successfully to MongoDB!');
        navigate('/');
      } else {
        alert('Error saving message: ' + (data.message || data.error));
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Could not connect to the backend server. Make sure server.js is running.');
    }
  };

  return (
    <div className="page-container">
      <h1>Contact Me</h1>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Contact Info</h3>
        <p><strong>Email:</strong> student@centennialcollege.ca</p>
        <p><strong>Location:</strong> Ontario, Canada</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <h3>Send Message</h3>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn" style={{ border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;