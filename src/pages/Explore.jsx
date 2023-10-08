import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataRef, auth } from '../firebase';
import '../styles/ProjectPage.css';
import { usePageContext } from '../components/PageContext';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.intro}</p>
    </div>
  );
};

const Explore = () => {
  const [projects, setProjects] = useState([]);
  const [currentUserUsername, setCurrentUserUsername] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      const username = userEmail.split('@')[0];
      setCurrentUserUsername(username);
    }
  }, []);

  useEffect(() => {
    dataRef.ref('projects').once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allProjects = Object.values(data);
        setProjects(allProjects);
      }
    });
  }, []);

  return (
    <div className="projects-page">
      <section className="my-projects">
        <h1 className="section-title">Projects</h1>
        {projects.length === 0 ? (
          <div className="not-found">
            <div className="center-content">
              <Link key="notFound" to={`/new-project`}>
                <p>No projects created. Click here to create one.</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="project-list">
            {projects.map((project) => (
              <Link key={project.title} to={`/project/${encodeURIComponent(project.title)}`}>
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Explore;
