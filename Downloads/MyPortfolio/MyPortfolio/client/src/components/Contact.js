import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/contacts';

const emptyForm = {
  firstname: '',
  lastname: '',
  email: '',
  contactNumber: '',
  message: ''
};

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = storedUser?.role === 'admin';

  const getHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const fetchContacts = async () => {
    if (!isAdmin) {
      return;
    }
    try {
      setError('');
      const res = await fetch(API_URL, {
        headers: getHeaders()
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || 'Failed to load messages');
        return;
      }
      setContacts(Array.isArray(data) ? data : data.contacts || []);
    } catch (err) {
      console.error(err);
      setError('Error connecting to server');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || 'Failed to send message');
        return;
      }

      alert(editingId ? 'Message updated!' : 'Message sent!');
      setFormData(emptyForm);
      setEditingId(null);
      if (isAdmin) {
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      firstname: item.firstname || '',
      lastname: item.lastname || '',
      email: item.email || '',
      contactNumber: item.contactNumber || '',
      message: item.message || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || 'Failed to delete message');
        return;
      }

      alert('Message deleted!');
      if (editingId === id) {
        handleCancelEdit();
      }
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="page-container" style={{ padding: '20px' }}>
      <h1>Contact</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <h3>{editingId ? 'Edit Contact Message' : 'Send a Message'}</h3>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label>Contact Number: </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label>Message: </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button type="submit">
            {editingId ? 'Update Message' : 'Send Message'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{ marginLeft: '8px' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {isAdmin && (
        <div className="grid">
          <h3>Submitted Messages</h3>
          {contacts.map((item) => (
            <div key={item._id} className="card">
              <h4>
                {item.firstname} {item.lastname}
              </h4>
              <p><strong>Email:</strong> {item.email}</p>
              {item.contactNumber && (
                <p><strong>Phone:</strong> {item.contactNumber}</p>
              )}
              <p>{item.message}</p>
              <div style={{ marginTop: '10px' }}>
                <button type="button" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  style={{ marginLeft: '8px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contact;