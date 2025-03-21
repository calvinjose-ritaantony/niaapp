import React, { Fragment } from 'react';
import CartIcon from '/images/cart-icon.svg';
import EnterpriseIcon from '/images/enterprise-icon.svg';
import { useNavigate } from 'react-router-dom';

const platformList = [
    {
        name: "e-commerce",
        title: "E-Commerce User",
        description: "Shop, browse, and manage your purchases",
        image: CartIcon,
        target: "e-commerce"
    },
    {
        name: "enterprise",
        title: "Enterprise Admin",
        description: "Manage your organization and users",
        image: EnterpriseIcon,
        target: "enterprise"
    }
]

const DashboardComponent = () => {

  const navigate = useNavigate();
  return (
    <div className='nia-content-wraper d-flex flex-column justify-content-center align-items-center h-100 text-center'>
        <div className='pb-4'>
            <h1 className='fw-bold'>Choose Your Experience</h1>
            <p>Select the option that best describes how you'll be using our platform</p>
        </div>
        <div className='nia-dashboard-platform-container'>
            {platformList && platformList.map((item, i)=>(
                <Fragment key={`platform_${i}`}>
                    <div className='nia-dashboard-platform-card' onClick={()=> navigate(`/${item.target}`)}>
                        <div className='nia-platform-card-icon'>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </Fragment>
            ))}
            
            {/* <div className='nia-dashboard-platform-card' onClick={()=> navigate('/enterprise')}>
                <div className='platform-card-icon'>
                    <img src={EnterpriseIcon} alt='Enterprise Admin' />
                </div>
                <h3>Enterprise Admin</h3>
                <p>Manage your organization and users</p>
            </div> */}
        </div>
    </div>
  )
}

export default DashboardComponent