import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataRef, auth } from '../firebase';

const ProjectSubmit = () => {
  const navigate = useNavigate();
  const userEmail = auth.currentUser.email;
  const username = userEmail.split('@')[0];
  const [formData, setFormData] = useState({
    title: '',
    intro: '',
    email: '',
    github: '',
    owner: username,
    message: '',
    users: username + ',',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataRef.ref("projects/" + formData.title.replace(/\s+/g, '_')).set(formData);
    console.log("projects/" + formData.title.replace(/\s+/g, '_') + formData);
    navigate('/home');
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h1>Your project details</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="intro">Short description</label>
            <input
              type="text"
              id="intro"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="github">Github</label>
            <input
              type="text"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">More info</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectSubmit;
