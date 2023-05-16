import React from 'react';
import logo from '../../assets/logo.png';
import bg from '../../assets/bg.jpeg';
import './landing.css';

function LandingPage() {
  return (
    <header className='landing-header' style={{ backgroundImage: `url(${bg})` }}>
      <div className='container'>
        <div className='logo-container'>
          <img src={logo} alt='Logo' className='logo' />
        </div>
        <div className='text-container'>
          <h1 className='title'>Glossom Music</h1>
          <p className='subtitle italic'>"Feel the Glow"</p>
        </div>
        <div className='button-container'>
          <button onClick={()=>navigate("/login")} className='btn btn-primary small'>Log in</button>
          <button className='btn btn-secondary small'>Register</button>
        </div>
      </div>
    </header>
  );
}

export default LandingPage;
