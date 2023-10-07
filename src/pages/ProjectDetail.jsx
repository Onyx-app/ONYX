import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataRef, auth } from '../firebase';
import { usePageContext } from '../components/PageContext';

const ProjectDetail = () => {
  const { title } = useParams();
  const [project, setProject] = useState(null);
  const { setProjectTitle } = usePageContext();

  useEffect(() => {
    const decodedTitle = decodeURIComponent(title);
    console.log("projectTitle: " + decodedTitle);
    setProjectTitle(decodedTitle);
    const user = auth.currentUser;
    const userEmail = user.email;
    const username = userEmail.split('@')[0];
    const projectRef = dataRef.ref('projects/' + decodedTitle);
    console.log('projects/' + decodedTitle);

    projectRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProject(data);
      }
    });
  }, [title]);

  return (
    <div className="project-detail">
      {project ? (
        <>
          <h1 className="project-title">{project.title}</h1>
          <div className="project-info">
            <p className="project-intro">{project.intro}</p>
            <p className="project-email">Contact: {project.email}</p>
            <p className="project-email">Github: {project.github}</p>
            <p className="project-email">{project.message}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetail;
