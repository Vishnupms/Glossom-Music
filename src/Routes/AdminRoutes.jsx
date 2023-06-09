import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLoginPage from '../pages/Admin/AdminLoginPage';
import AdminDash from '../components/Admin/AdminDash';
import UserTables from '../components/Admin/UserTables';
import ArtistTables from '../components/Admin/ArtistTables';
import ProtectedAdmin from '../../ProtectedAdmin';
import NotFoundPage from '../components/Landing Page/NotFound';

function AdminRoutes() {
  return (
    <Routes>
    <Route path='/login' element={<AdminLoginPage />} />
    <Route path='/' element={<ProtectedAdmin><AdminDash /></ProtectedAdmin>} />
    <Route path='/users' element={<ProtectedAdmin><UserTables /></ProtectedAdmin>} />
    <Route path='/artist' element={<ProtectedAdmin><ArtistTables /></ProtectedAdmin>} />
    <Route path='*' element={<NotFoundPage/>} />



</Routes>
  )
}

export default AdminRoutes