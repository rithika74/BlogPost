import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from 'react-icons/fa';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleClick = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleToggle = () => {
    setIsNavExpanded(!isNavExpanded); // Toggle the navbar state
  };

  const handleNavLinkClick = () => {
    setIsNavExpanded(false); // Close the navbar when a link is clicked
  };

  return (
    <>
      <header>
        <Navbar
          expand="lg"
          variant="light"
          className="shadow-sm fixed-top bg-light"
          expanded={isNavExpanded}
          onToggle={handleToggle}
        >
          <Container className='bg'>
            <Navbar.Brand as={Link} to="/home" className='hd1'>
              Blog Post
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ border: 'none', outline: 'none' }}>
              {isNavExpanded ? <span style={{ color: 'black' }}>&times;</span> : <span style={{ color: 'black' }}>&#9776;</span>}
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto link">
                <Nav.Link as={Link} to="/home" onClick={handleNavLinkClick}><li>HOME</li></Nav.Link>
                <Nav.Link as={Link} to="/home/blogs" onClick={handleNavLinkClick}><li>BLOGS</li></Nav.Link>
                <Nav.Link as={Link} to="/home/add" onClick={handleNavLinkClick}><li>CREATE YOUR BLOGS</li></Nav.Link>
                <NavDropdown title={<FaUserCircle />} className='user' id="basic-nav-dropdown" >
                  <NavDropdown.Item as={Link} to="/home/profile" onClick={handleNavLinkClick}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleClick}><div className='logout'>Logout</div></NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Outlet />
    </>
  );
};

export default Home;

