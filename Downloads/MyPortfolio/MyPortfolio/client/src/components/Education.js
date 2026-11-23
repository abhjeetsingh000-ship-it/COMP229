import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/qualifications';

const emptyForm = {
  title: '',
  firstname: '',
  lastname: '',
  email: '',
  completion: '',
  description: ''
};

function Education() {
  const [qualifications, setQualifications] = useState([]);
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

  const fetchQualifications = async () => {
    try {
      setError('');
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || 'Failed to load education records');
        return;
      }
      setQualifications(
        Array.isArray(data) ? data : data.qualifications || []
      );
    } catch (err) {
      console.error(err);
      setError('Error connecting to server');
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

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
        alert(data.message || data.error || 'Failed to save qualification');
        return;
      }

      alert(editingId ? 'Qualification updated!' : 'Qualification added!');
      setFormData(emptyForm);
      setEditingId(null);
      fetchQualifications();
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      firstname: item.firstname || '',
      lastname: item.lastname || '',
      email: item.email || '',
      completion: item.completion || '',
      description: item.description || ''
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
        alert(data.message || data.error || 'Failed to delete qualification');
        return;
      }

      alert('Qualification deleted!');
      if (editingId === id) {
        handleCancelEdit();
      }
      fetchQualifications();
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="page-container" style={{ padding: '20px' }}>
      <h1>Education & Qualifications</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isAdmin ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <h3>{editingId ? 'Edit Qualification' : 'Add Qualification'}</h3>
          <div>
            <label>Title / Program: </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>First Name: </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>Last Name: </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>Completion Date / Status: </label>
            <input
              type="text"
              name="completion"
              value={formData.completion}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>Description: </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginTop: '12px' }}>
            <button type="submit">
              {editingId ? 'Update Qualification' : 'Add Qualification'}
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
      ) : (
        <p>Sign in as an Admin to add, edit, or delete education records.</p>
      )}

      <div className="grid">
        {qualifications.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.title}</h3>
            {item.completion && (
              <p><strong>Completion:</strong> {item.completion}</p>
            )}
            {(item.firstname || item.lastname) && (
              <p>
                <strong>Name:</strong> {item.firstname} {item.lastname}
              </p>
            )}
            {item.email && (
              <p><strong>Email:</strong> {item.email}</p>
            )}
            <p>{item.description}</p>
            {isAdmin && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;