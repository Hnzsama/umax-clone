import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './auth/SignIn'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import Accounts from './pages/Accounts'
import Clients from './pages/Clients'
import User from './pages/User'
import Tenant from './tenant/Tenant';
import Profile from './profile/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns/>} />
        <Route path="/accounts" element={<Accounts/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/tenant" element={<Tenant/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App
