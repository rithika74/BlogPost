

import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [expanded, setExpanded] = useState(false);
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

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <header>
        <Navbar expand="lg" variant="light" className="shadow-sm fixed-top bg-light">
          <Container className='bg'>
            <Navbar.Brand as={Link} to="/home" style={{ textDecoration: 'none', color: 'black', fontSize: '32px' }}>
              Blog Post
            </Navbar.Brand>
            <Navbar.Toggle onClick={toggleNavbar} aria-controls="basic-navbar-nav" style={{ border: 'none', outline: 'none' }}>
              {expanded ? <span style={{ color: 'black' }}>&times;</span> : <span style={{ color: 'black' }}>&#9776;</span>}
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className={`${expanded ? 'show' : ''}`}>
              <Nav className="ms-auto link">
                <Nav.Link as={Link} to="/home"><li>HOME</li></Nav.Link>
                <Nav.Link as={Link} to="/home/blogs"><li>BLOGS</li></Nav.Link>
                <Nav.Link as={Link} to="/home/profile"><li>PROFILE</li></Nav.Link>
                <Nav.Link as={Link} to="/home/add"><li>CREATE YOUR BLOGS</li></Nav.Link>
                <Nav.Link onClick={handleClick}><li className='logout'>LogOut</li></Nav.Link>
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
