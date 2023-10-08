import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataRef, auth } from '../firebase';
import { usePageContext } from '../components/PageContext';
import '../styles/ProjectDetail.css';

const ProjectDetail = () => {
  const { title } = useParams();
  const [project, setProject] = useState(null);
  const { setProjectTitle } = usePageContext();

  useEffect(() => {
    const decodedTitle = decodeURIComponent(title);
    setProjectTitle(decodedTitle);
    const user = auth.currentUser;
    const userEmail = user.email;
    const username = userEmail.split('@')[0];
    const projectRef = dataRef.ref('projects/' + decodedTitle);

    projectRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProject(data);
      }
    });
  }, [title]);

  return (
    <div className="project-detail-container">
      {project ? (
        <div className="project-detail-card">
          <h1 className="project-detail-title">{project.title}</h1>
          <div className="project-detail-info">
            <p className="project-detail-intro">Description: {project.intro}</p>
            <p className="project-detail-email">Contact: {project.email}</p>
            <p className="project-detail-email">Github: {project.github}</p>
          </div>
          <h2 className="project-detail-message">{project.message}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetail;
