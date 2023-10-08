import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { usePageContext } from './PageContext';
import { dataRef } from '../firebase';


const NavbarComp = () => {
  const { projectTitle } = usePageContext();
  const location = useLocation();
  const { currentUser, logout } = UserAuth();
  const { signinWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  var searchBarView = true;

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch(error) {
      console.log(error)
    }
  }

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
      } else {
        setSearchResults([]);
      }
    };

    projectsRef.on('value', searchHandler);

    return () => {
      projectsRef.off('value', searchHandler);
    };
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
                <Button variant="primary">View Project</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  const renderButtons = () => {
    if (location.pathname.includes('/project')) {
      searchBarView = false;
      return (
        <>
          <Nav.Link href="/chat">Chat</Nav.Link>
          <Nav.Link href={`/add-user/${projectTitle}`}>Add user</Nav.Link>
        </>
      );
    } else if (location.pathname.includes('/home')) {
      searchBarView = true;
      return (
        <Nav.Link href="/new-project">New project</Nav.Link>
      );
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
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link onClick={()=>navigate('/contact')}>Contact</Nav.Link>
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
              {searchBarView && (
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              )}
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {searchResults.length > 0 && renderSuggestions()}
    </div>
  );
};

export default NavbarComp;
