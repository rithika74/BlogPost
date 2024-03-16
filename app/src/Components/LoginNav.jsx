import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

const LoginNav = () => {

    const [expanded, setExpanded] = useState(false);

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
                                <Nav.Link href="#home" as={Link} to='/home'><li>HOME</li></Nav.Link>
                                <Nav.Link href="#link" as={Link} to='/blogs'><li>BLOGS</li></Nav.Link>
                                <Nav.Link href="#link" as={Link} to='/login'><li className='login'>LOGIN</li></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <Outlet />

        </>
    )
}

export default LoginNav
