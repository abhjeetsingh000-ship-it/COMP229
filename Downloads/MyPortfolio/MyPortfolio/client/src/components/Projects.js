import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/projects';

const emptyForm = {
  title: '',
  firstname: '',
  lastname: '',
  email: '',
  completion: '',
  description: ''
};

function Projects() {
  const [projects, setProjects] = useState([]);
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

  const fetchProjects = async () => {
    try {
      setError('');
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || 'Failed to load projects');
        return;
      }
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      console.error(err);
      setError('Error connecting to server');
    }
  };

  useEffect(() => {
    fetchProjects();
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
        alert(data.message || data.error || 'Failed to save project');
        return;
      }

      alert(editingId ? 'Project updated!' : 'Project created!');
      setFormData(emptyForm);
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      firstname: project.firstname || '',
      lastname: project.lastname || '',
      email: project.email || '',
      completion: project.completion || '',
      description: project.description || ''
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
        alert(data.message || data.error || 'Failed to delete project');
        return;
      }

      alert('Project deleted!');
      if (editingId === id) {
        handleCancelEdit();
      }
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="page-container" style={{ padding: '20px' }}>
      <h1>My Projects</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isAdmin ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
          <div>
            <label>Title: </label>
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
            <label>Completion: </label>
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
              {editingId ? 'Update Project' : 'Add Project'}
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
        <p>Sign in as an Admin to add, edit, or delete projects.</p>
      )}

      <div className="grid">
        {projects.map((project) => (
          <div key={project._id} className="card">
            <h3>{project.title}</h3>
            {project.completion && (
              <p><strong>Completion:</strong> {project.completion}</p>
            )}
            {(project.firstname || project.lastname) && (
              <p>
                <strong>Owner:</strong> {project.firstname} {project.lastname}
              </p>
            )}
            {project.email && (
              <p><strong>Email:</strong> {project.email}</p>
            )}
            <p>{project.description}</p>
            {isAdmin && (
              <div style={{ marginTop: '10px' }}>
                <button type="button" onClick={() => handleEdit(project)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project._id)}
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

export default Projects;