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

const Dashboard = () => {
  const [myProjects, setMyProjects] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
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
    if (currentUserUsername) {
      // Fetch My Projects data
      dataRef.ref('projects').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const allProjects = Object.values(data);

          const myProjectsData = allProjects.filter((project) =>
            project.users.includes(`${currentUserUsername}`)
          );

          setMyProjects(myProjectsData);
        }
      });

      // Fetch all recommended projects
      dataRef.ref('projects').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const allProjects = Object.values(data);

          const filteredRecommendedProjects = allProjects.filter(
            (project) => !project.users.includes(`${currentUserUsername}`)
          );

          const shuffledRecommendedProjects = shuffleArray(
            filteredRecommendedProjects
          );

          // Select the first 5 projects
          const selectedRecommendedProjects = shuffledRecommendedProjects.slice(
            0,
            5
          );

          setRecommendedProjects(selectedRecommendedProjects);
        }
      });
    }
  }, [currentUserUsername]);

  // Shuffle projects randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const notFound = {
    title: 'No projects created',
    intro: 'click here to create'
  }

  return (
    <div className="projects-page">
      <section className="my-projects">
        <h1 className="section-title">My Projects</h1>
        {myProjects.length === 0 ? (
          <div className="not-found">
          <div className="center-content">
            <Link key="notFound" to={`/new-project`}>
              <p><ProjectCard project={notFound} /> </p>
            </Link>
          </div>
        </div>        
        ) : (
          <div className="project-list">
            {myProjects.map((project) => (
              <Link key={project.title} to={`/project/${encodeURIComponent(project.title)}`}>
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="recommended-projects">
        <h1 className="section-title">Recommended Projects</h1>
        <div className="project-list">
          {recommendedProjects.map((project) => (
            <Link key={project.title} to={`/project/${encodeURIComponent(project.title)}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
