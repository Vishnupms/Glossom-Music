import React from 'react';
import logo from '../../assets/logo.png';
import bg from '../../assets/bg.jpeg';
import './landing.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate()
  if(localStorage.getItem("token")){
    return <Navigate to = {"/home"} replace = {true}></Navigate>
  }
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
    
          <button onClick={()=>navigate("/choice")} className='btn btn-secondary small'>Get Started</button>
        </div>
      <Link to={"/login"}><i>already have an account ?</i></Link>
      </div>
    </header>
  );
}

export default LandingPage;
