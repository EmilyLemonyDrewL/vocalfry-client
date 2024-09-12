/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  const ProfileId = user?.id;
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Link passHref href="/">
          <Image src="/LargeVocalFryLogo.png" alt="Vocal Fry logo" style={{ height: '120px' }} />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {user.user_type === false && (
              <Link passHref href={`/Profile/${ProfileId}`}>
                <Nav.Link className="nav-link">My Profile</Nav.Link>
              </Link>
            )}
            <Link passHref href="/Category/Categories">
              <Nav.Link className="nav-link">Categories</Nav.Link>
            </Link>
            <Link passHref href="/Jobs/JobListings">
              <Nav.Link className="nav-link">Job Listings</Nav.Link>
            </Link>
            {user.user_type === true && (
              <Link passHref href="/Jobs/MyJobs">
                <Nav.Link className="nav-link">My Jobs Listings</Nav.Link>
              </Link>
            )}
            <Button className="logout-nav-btn" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
