import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ArtistHome from "../pages/Artist/ArtistHome";
import ArtistRegisterPage from '../pages/Artist/ArtistRegisterPage';
import ArtistLoginPage from '../pages/Artist/ArtistLoginPage';
import ArtistProfile from '../components/Artist/ArtistProfile';
import AddTrack from '../components/Artist/AddTrack';
import CreateAlbum from '../components/Artist/CreateAlbum';
import MySongs from '../components/Artist/MySongs';
import ProtectedArtist from '../../ProtectedArtist';

function ArtistRoutes() {
  return (
    <Routes>
        <Route path='/signup' element={<ArtistRegisterPage />} />
        <Route path='/login' element={<ArtistLoginPage />} />
        <Route path='/' element={<ProtectedArtist><ArtistHome /></ProtectedArtist>} />
        <Route path='/addmusic' element={<ProtectedArtist><AddTrack/></ProtectedArtist>} />
        <Route path='/profile' element={<ProtectedArtist><ArtistProfile /></ProtectedArtist>} />
        <Route path='/create-album' element={<ProtectedArtist><CreateAlbum /></ProtectedArtist>} />
        <Route path='/my-songs' element={<ProtectedArtist><MySongs /></ProtectedArtist>} />




    </Routes>
  )
}

export default ArtistRoutes