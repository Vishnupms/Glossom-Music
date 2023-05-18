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
  import ProtectedUser from '../../ProtectedUser';
  import LandingPage from '../components/Landing Page/LangingPage';
  import Choice from '../components/User/Choice';
import NotFoundPage from '../components/Landing Page/NotFound';





  const Profile = lazy(() => import("../components/User/Profile"));
  function UserRoutes() {
    return (
      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/choice' element={<Choice/>} />
          <Route path='/login' element={<LoginPage/> } />
          <Route path='/register' element={<RegisterPage/> } />
          <Route path='/register/otp' element={<Otp/>} />
          <Route path='/home' element={<ProtectedUser><HomePage/></ProtectedUser> } />
          <Route path="/profile"element={<Suspense fallback={<div><h2>Lazy Loading</h2></div>}> <ProtectedUser> <Profile /></ProtectedUser></Suspense>}/>
          <Route path='/top-artist' element={<ProtectedUser><TopArtist /></ProtectedUser>} />
          <Route path='/show-artist' element={<ProtectedUser><ArtistPage /></ProtectedUser>} />
          <Route path='/playlist' element={<ProtectedUser><Playlist /></ProtectedUser>} />
          <Route path='/create-playlist' element={<ProtectedUser><CreatePlaylist /></ProtectedUser>} />
          <Route path='/get-playlist' element={<ProtectedUser><GetPlaylist /></ProtectedUser>} />
          <Route path='/my-favourites' element={<ProtectedUser><Favourites /></ProtectedUser>} />
          <Route path='/*' element={<NotFoundPage/>} />

          

        

      </Routes>
    )
  }

  export default UserRoutes