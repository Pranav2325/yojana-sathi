import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
const App = () => {
  return (
    <Router>
      <Toaster position="top-right"/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<div>Login Page</div>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<div>Dashboard Page</div>}/>
        <Route path="/profile" element={<div>Profile Page</div>}/>
        <Route path="/schemes" element={<div>All Schemes Page</div>}/>
        <Route path="/scheme/:id" element={<div>Scheme detail Page</div>}/>
      </Routes>

    </Router>
  );
};

export default App;
