import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MatchedSchemesPage from "./pages/MatchedSchemesPage";
import SchemeDetailPage from "./pages/SchemeDetailPage";
import SchemesPage from "./pages/SchemesPage";
const App = () => {
  return (
    <Router>
      <Toaster position="top-right"/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<div>Dashboard Page</div>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/schemes/matched" element={<MatchedSchemesPage/>}/>
        <Route path="/schemes/:id" element={<SchemeDetailPage/>}/>
        <Route path="/schemes" element={<SchemesPage/>}/>
        
        
      </Routes>

    </Router>
  );
};

export default App;
