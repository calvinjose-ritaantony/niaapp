import React from 'react';
import BOSCH_Logo from '/images/bosch-logo.svg';
import Profile_Icon from '/images/my-brand-frame.svg';
import ToggleLeft from '/images/list-view-mobile.svg';

const HeaderComponent = (props) => {
  const togglePanel = () =>{
    props.toggleLeftPanel(!props.showLeftPanel);
  }
  return (
    <div className='nia-header'>
        <div className='nia-header-container'>
            <div className='nia-brand-name'>
                <img src={ToggleLeft} alt={''} className='nia-toggleSliderbtn' onClick={togglePanel} />
                <img src={BOSCH_Logo} alt='BOSCH' />
                <span className='nia-brand-separator'> </span>
                <span><span className='nia-color-BA04AE'>N</span><span className='nia-color-EB0100'>I</span><span className='nia-color-BA04AE'>A</span></span>
            </div>
            <div className='nia-brand-title'><span>NextGen Intelligent Assistant</span></div>
            <div className='nia-profile'>
                <span className='nia-welcome-text'>
                  Welcome! Dharmeswaram!
                </span>
                <span className='nia-separator'></span>
                {/* <img src={Profile_Icon} alt={'Profile'} /> */}
                <span className='nia-logout'>Logout</span>
            </div>
        </div>
        
    </div>
  )
}

export default HeaderComponent