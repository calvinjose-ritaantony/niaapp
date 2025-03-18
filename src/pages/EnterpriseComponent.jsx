import React, { useEffect } from 'react'
import PageContentComponent from '../components/PageContentComponent';

const EnterpriseComponent = (props) => {
  
  return (
    <PageContentComponent  showLeftPanel={props.showLeftPanel}/>
  )
}

export default EnterpriseComponent