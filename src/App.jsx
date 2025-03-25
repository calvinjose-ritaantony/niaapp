import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './fonts/nia-fonts.css';
import './App.css';
import HeaderComponent from './components/HeaderComponent'
import LoginComponent from './components/LoginComponent'
import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import DashboardComponent from './pages/DashboardComponent';
import EcommerceComponent from './pages/EcommerceComponent';

function App() {
  const toggleLeftPanel = (toggle) =>{
    setShowLeftPanel(toggle);
  }
  return (
    <><Router>
    <div className='main'>
    
      <AuthenticatedTemplate>
        <HeaderComponent toggleLeftPanel={toggleLeftPanel} />
        <div className='nia-container'>
        <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/e-commerce" element={<EcommerceComponent category="e-commerce" />} />
        <Route path="/enterprise" element={<EcommerceComponent category="enterprise" />} />
        </Routes>
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
          <LoginComponent />
      </UnauthenticatedTemplate>
      
    </div></Router>
    </>
  )
}

export default App
