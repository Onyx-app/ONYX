import React, { useState } from 'react';
import { dataRef, auth } from '../firebase';

const AddUsers = ({ projectTitle }) => {
  const [formData, setFormData] = useState({
    users: '',
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
    const { users } = formData;
    const userEmailParts = users.split('@');

    if (userEmailParts.length !== 2) {
      console.log("Invalid email format");
      return;
    }
    
    const username = userEmailParts[0];
    console.log("projectTitle: " + projectTitle);
  
    dataRef.ref("projects/" + projectTitle).once('value', (snapshot) => {
      const projectData = snapshot.val();
      if (projectData && projectData.users) {
        const existingUsers = projectData.users.split(',');
        console.log("existingUser: " + existingUsers);
        if (!existingUsers.includes(username)) {
          console.log("check");
          existingUsers.push(username);
        }
        
        const updatedUsers = existingUsers.join(',');
        console.log("UpdatedUser: " + updatedUsers);
        dataRef.ref("projects/" + projectTitle + "/users").set(updatedUsers);
      } else {
        dataRef.ref("projects/" + projectTitle + "/users").set(username);
      }
    });
  
    console.log("projects/" + projectTitle + "/users");
  };
  
  return (
    <div className="form-container">
      <h1>Your project details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="users">Email</label>
          <input
            type="email"
            id="users"
            name="users"
            value={formData.users}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add user</button>
      </form>
    </div>
  );
};

export default AddUsers;
