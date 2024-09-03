import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

function Home() {
  const router = useRouter();
  const navigateTo = (path) => {
    router.push(path);
  };

  const buttonStyle = {
    backgroundColor: '#412779',
    border: 'inset',
    color: '#FFCC00',
    height: '60px',
    width: '70%',
    fontSize: '30px',
  };

  const signOutBtn = {
    backgroundColor: '#FFCC00',
    border: 'inset',
    color: '#412779',
    height: '60px',
    width: '70%',
    fontSize: '30px',
  };

  return (
    <div
      className="home-btns"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontSize: '22px',
        marginTop: '50px',
      }}
    >
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Image
          src="/LargeVocalFryLogo.png"
          alt="Vocal Fry Logo"
          style={{
            height: '220px',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>
      <div className="w-100">
        <Button
          className="d-block w-100 mb-3"
          onClick={() => navigateTo('/Profile/MyProfile')}
          style={buttonStyle}
        >
          My Profile
        </Button>
        <Button
          className="d-block w-100 mb-3"
          onClick={() => navigateTo('/Category/Categories')}
          style={buttonStyle}
        >
          Categories
        </Button>
        <Button
          className="d-block w-100 mb-3"
          onClick={() => navigateTo('/Jobs/JobListings')}
          style={buttonStyle}
        >
          Job Listings
        </Button>
        <Button
          className="d-block w-100 mb-3"
          onClick={() => navigateTo('/Jobs/MyJobs')}
          style={buttonStyle}
        >
          My Job Listings
        </Button>
        <Button
          className="d-block w-100 mb-3"
          onClick={signOut}
          style={signOutBtn}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default Home;
