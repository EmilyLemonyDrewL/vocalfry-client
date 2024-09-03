import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <h1>Please</h1>
      <Button className="login-btn" onClick={signIn}>Sign in with Google</Button>
      <h4>in order to use</h4>
      <Image
        src="/LargeVocalFryLogo.png"
        style={{ width: '260px' }}
        className="mx-auto"
      />
    </div>
  );
}

export default Signin;
