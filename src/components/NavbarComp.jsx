import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { usePageContext } from './PageContext';
import { dataRef } from '../firebase';
import '../styles/NavbarComp.css';

const NavbarComp = () => {
  const { projectTitle } = usePageContext();
  const location = useLocation();
  const { currentUser, logout } = UserAuth();
  const { signinWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewProjectClicked, setViewProjectClicked] = useState(false);

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const projectsRef = dataRef.ref('projects/');
    const maxResults = 3;

    const searchHandler = (snapshot) => {
      const projects = snapshot.val();
      if (projects) {
        const matchingResults = Object.keys(projects).filter((key) => {
          return (
            projects[key].title &&
            projects[key].title.toLowerCase().includes(query.toLowerCase())
          );
        });
        const limitedResults = matchingResults.slice(0, maxResults);
        setSearchResults(limitedResults);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    };

    projectsRef.on('value', searchHandler);

    return () => {
      projectsRef.off('value', searchHandler);
    };
  };

  const handleViewProjectClick = () => {
    setViewProjectClicked(true);
    setSearchQuery('');
  };

  const handleNewInput = () => {
    setViewProjectClicked(false);
  };

  const renderSuggestions = () => {
    return (
      <div className="navbar-search-results-right">
        {searchResults.map((result) => (
          <Card
            key={result}
            style={{ width: '18rem', margin: '0.5rem' }}
            onClick={() => navigate(`/project/${result}`)}
            className="cursor-pointer"
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title>{result}</Card.Title>
                <Button
                  variant="primary"
                  style={{ width: '100px', height: '30px' }}
                  onClick={handleViewProjectClick}
                >
                  View Project
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  const renderButtons = () => {
    if (location.pathname.includes('/project')) {
      return (
        <>
          <Nav.Link href="/chat">Chat</Nav.Link>
          <Nav.Link href={`/add-user/${projectTitle}`}>Add user</Nav.Link>
        </>
      );
    } else if (location.pathname.includes('/home')) {
      return <Nav.Link href="/new-project">New project</Nav.Link>;
    }
    return null;
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/home">ONYX</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link onClick={() => navigate('/contact')}>Contact</Nav.Link>
              {currentUser ? (
                <>
                  {renderButtons()}
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleLogin}>Login</Nav.Link>
              )}
            </Nav>
            <Row className="ml-auto mr-0">
              <Col xs="auto">
                {searchResults.length > 0 && showSuggestions && !viewProjectClicked && renderSuggestions()}
              </Col>
              <Col xs="auto">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onClick={handleNewInput}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
