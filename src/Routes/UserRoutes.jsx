import React,{ lazy,Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/User/HomePage';
import LoginPage from '../pages/User/LoginPage';
import RegisterPage from '../pages/User/RegisterPage';
import Otp from '../components/User/Otp';
import Playlist from '../components/User/Playlist/Playlist';
import CreatePlaylist from '../components/User/Playlist/CreatePlaylist';
import GetPlaylist from '../components/User/Playlist/GetPlaylist';
import TopArtist from '../components/User/TopArtist';
import ArtistPage from '../pages/User/ArtistPage';
import Favourites from '../pages/User/Favourites';





const Profile = lazy(() => import("../components/User/Profile"));
function UserRoutes() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/> } />
        <Route path='/register' element={<RegisterPage/> } />
        <Route path='/register/otp' element={<Otp/>} />
        <Route path='/home' element={<HomePage/> } />
        <Route path="/profile"element={<Suspense fallback={<div><h2>Lazy Loading</h2></div>}> <Profile /></Suspense>}/>
        <Route path='/top-artist' element={<TopArtist />} />
        <Route path='/show-artist' element={<ArtistPage />} />
        <Route path='/playlist' element={<Playlist />} />
        <Route path='/create-playlist' element={<CreatePlaylist />} />
        <Route path='/get-playlist' element={<GetPlaylist />} />
        <Route path='/my-favourites' element={<Favourites />} />

       

    </Routes>
  )
}

export default UserRoutes