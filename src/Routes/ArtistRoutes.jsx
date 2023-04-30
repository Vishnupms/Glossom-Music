import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ArtistHome from "../pages/Artist/ArtistHome";
import ArtistRegisterPage from '../pages/Artist/ArtistRegisterPage';
import ArtistLoginPage from '../pages/Artist/ArtistLoginPage';
import ArtistProfile from '../components/Artist/ArtistProfile';
import AddTrack from '../components/Artist/AddTrack';

function ArtistRoutes() {
  return (
    <Routes>
        <Route path='/signup' element={<ArtistRegisterPage />} />
        <Route path='/login' element={<ArtistLoginPage />} />
        <Route path='/' element={<ArtistHome />} />
        <Route path='/addmusic' element={<AddTrack/>} />
        <Route path='/profile' element={<ArtistProfile />} />


    </Routes>
  )
}

export default ArtistRoutes