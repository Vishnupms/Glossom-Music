import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Otp from '../components/Otp';
import Profile from '../components/Profile';
import TopArtist from '../pages/TopArtist';
import Playlist from '../components/Playlist';

function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/> } />
        <Route path='/register' element={<RegisterPage/> } />
        <Route path='/register/otp' element={<Otp/>} />
        <Route path='/home' element={<HomePage/> } />
        <Route path='/profile' element={<Profile />} />
        <Route path='/top-artist' element={<TopArtist />} />
        <Route path='/playlist' element={<Playlist />} />

       

        


    </Routes>
  )
}

export default UserRoutes