import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ArtistHome from "../pages/Artist/ArtistHome";
import ArtistRegisterPage from '../pages/Artist/ArtistRegisterPage';
import AddMusic from '../pages/Artist/AddMusic';
import ArtistLoginPage from '../pages/Artist/ArtistLoginPage';

function ArtistRoutes() {
  return (
    <Routes>
        <Route path='/signup' element={<ArtistRegisterPage />} />
        <Route path='/login' element={<ArtistLoginPage />} />
        <Route path='/' element={<ArtistHome />} />
        <Route path='/addmusic' element={<AddMusic />} />

    </Routes>
  )
}

export default ArtistRoutes