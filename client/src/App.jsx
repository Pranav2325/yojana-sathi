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
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminPage from "./pages/AdminPage";
const App = () => {
  return (
    <Router>
      <Toaster position="top-right"/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="/schemes/matched" element={<ProtectedRoute><MatchedSchemesPage/></ProtectedRoute>}/>
        <Route path="/schemes/:id" element={<SchemeDetailPage/>}/>
        <Route path="/schemes" element={<SchemesPage/>}/>
        <Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}/>
        
        
      </Routes>

    </Router>
  );
};

export default App;
