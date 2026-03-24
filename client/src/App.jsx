import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Landing Page</div>}/>
        <Route path="/login" element={<div>Login Page</div>}/>
        <Route path="/register" element={<div>Register Page</div>}/>
        <Route path="/dashboard" element={<div>Dashboard Page</div>}/>
        <Route path="/profile" element={<div>Profile Page</div>}/>
        <Route path="/schemes" element={<div>All Schemes Page</div>}/>
        <Route path="/scheme/:id" element={<div>Scheme detail Page</div>}/>
      </Routes>

    </Router>
  );
};

export default App;
