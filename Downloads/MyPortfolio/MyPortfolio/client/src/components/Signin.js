import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token || data.jwt;
        if (token) {
          localStorage.setItem('token', token);
        }

        const rawUser = data.user || {};
        const userInfo = {
          ...rawUser,
          _id: rawUser._id || rawUser.id || data._id || data.id,
          name: rawUser.name || data.name,
          email: rawUser.email || data.email || email,
          role: rawUser.role || data.role || 'user'
        };
        localStorage.setItem('user', JSON.stringify(userInfo));

        window.dispatchEvent(new Event('authChange'));
        alert(data.message || 'Signed in successfully!');
        navigate('/');
      } else {
        alert(data.message || data.error || 'Failed to sign in');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}