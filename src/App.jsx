import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './fonts/nia-fonts.css';
import './App.css';
import HeaderComponent from './components/HeaderComponent'
import PageContentComponent from './components/PageContentComponent'
import { useState } from 'react';

function App() {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const toggleLeftPanel = (toggle) =>{
    setShowLeftPanel(toggle);
  }
  return (
    <>
    <div className='main'>
      <HeaderComponent toggleLeftPanel={toggleLeftPanel} showLeftPanel={showLeftPanel} />
      <PageContentComponent showLeftPanel={showLeftPanel} />
    </div>
    </>
  )
}

export default App
