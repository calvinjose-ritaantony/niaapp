import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './fonts/nia-fonts.css';
import './App.css';
import HeaderComponent from './components/HeaderComponent'
import PageContentComponent from './components/PageContentComponent'
import LoginComponent from './components/LoginComponent'
import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import EcomerceComponent from './pages/EcomerceComponent';
import DashboardComponent from './pages/DashboardComponent';
import EnterpriseComponent from './pages/EnterpriseComponent';

function App() {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const toggleLeftPanel = (toggle) =>{
    setShowLeftPanel(toggle);
  }
  return (
    <><Router>
    <div className='main'>
    
      <AuthenticatedTemplate>
        <HeaderComponent toggleLeftPanel={toggleLeftPanel} showLeftPanel={showLeftPanel} />
        <div className='h-100'>
        <Routes>
        <Route path="/" element={<DashboardComponent showLeftPanel={showLeftPanel} />} />
        <Route path="/e-commerce" element={<EcomerceComponent showLeftPanel={showLeftPanel} />} />
        <Route path="/enterprise" element={<EnterpriseComponent showLeftPanel={showLeftPanel} />} />
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
