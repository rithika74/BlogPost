import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

const LoginNav = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const toggleNavbar = () => {
        setIsNavExpanded(!isNavExpanded);
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
                    onToggle={toggleNavbar}
                >
                    <Container className='bg'>
                        <Navbar.Brand href="#home" style={{ textDecoration: 'none', color: 'black', fontSize: '32px' }}>Blog Post</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ border: 'none', outline: 'none' }}>
                            {isNavExpanded ? <span style={{ color: 'black' }}>&times;</span> : <span style={{ color: 'black' }}>&#9776;</span>}
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto link">
                                <Nav.Link href="#home" as={Link} to='/home' onClick={handleNavLinkClick}><li>HOME</li></Nav.Link>
                                <Nav.Link href="#link" as={Link} to='/blogs' onClick={handleNavLinkClick}><li>BLOGS</li></Nav.Link>
                                <Nav.Link href="#link" as={Link} to='/login' onClick={handleNavLinkClick}><li className='login'>LOGIN</li></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <Outlet />
        </>
    );
}

export default LoginNav;

