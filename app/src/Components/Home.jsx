import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  const user = localStorage.getItem('id')

  const handleClick = () => {
    // localStorage.removeItem('token')
    localStorage.clear()
    navigate(`/login`)
  }

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };
  return (
    <>

      <header>
        <Navbar expand="lg" variant="light" className="shadow-sm fixed-top bg-light ">
          <Container className='bg'>
            <Navbar.Brand href="#home" style={{ textDecoration: 'none', color: 'black', fontSize: '32px' }}>Blog Post</Navbar.Brand>
            <Navbar.Toggle onClick={toggleNavbar} aria-controls="basic-navbar-nav" style={{ border: 'none', outline: 'none' }}>
              {expanded ? <span style={{ color: 'black' }}>&times;</span> : <span style={{ color: 'black' }}>&#9776;</span>}
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className={`${expanded ? 'show' : ''}`}>
              <Nav className="ms-auto link">
                <Nav.Link href="#home" as={Link} to='/'><li>HOME</li></Nav.Link>
                <Nav.Link href="#link" as={Link} to='/blogs'><li>BLOGS</li></Nav.Link>
                {user ? (
                  <>
                    <Nav.Link href="#link" as={Link} to='/profile'><li>PROFILE</li></Nav.Link>
                    <Nav.Link href="#link" as={Link} to='/add'><li>CREATE YOUR BLOGS</li></Nav.Link>
                    <Nav.Link href="#link"><button onClick={handleClick}>LOGOUT</button></Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="#link" as={Link} to='/login'><button>LOGIN</button></Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <Outlet />




    </>
  )
}

export default Home