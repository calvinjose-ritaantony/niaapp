import React, { useEffect, useState } from 'react'
import CategoryListComponent from '../components/CategoryListComponent'
import { useDispatch, useSelector } from 'react-redux';
import { getGptAction } from '../redux/actions/ChatConversationAction';
import RightPanelComponent from '../components/RightPanelComponent';
import { CHAT_USECASE_SUCCESS } from '../redux/constants/chatConstants';



const EcommerceComponent = (props) => {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const getGptData = useSelector(state => state.chatListData?.gptList);
  const [activeGptDetails, setActiveGptDetails] = useState({});

  const dispatch = useDispatch();
  
  const selectListHandler = (listData) => {
    setSelectedUseCase(listData);
  }

  const getGpts = async() => {
    const getGptDetails = await dispatch(getGptAction());
  }

  useEffect(()=>{
    getGpts();
  },[props.category]);

  const clearCategory = () => {
    dispatch({type:CHAT_USECASE_SUCCESS, payload: null });
    setSelectedUseCase(null);
  }

  useEffect(()=>{
    return ()=>{
      clearCategory();
    }
  },[])
  
  useEffect(()=>{
    const activeGpt = getGptData?.filter((item)=>item.description==='Nia')[0] ? getGptData?.filter((item)=>item.description==='Nia')[0] : {};
    setActiveGptDetails(activeGpt);
  },[getGptData]);
  return (
    <>
    <div className='nia-category-container nia-content-wraper'>
        <CategoryListComponent category={props.category} activeGptDetails={activeGptDetails} selectListHandler={selectListHandler} />
    </div>
    <div className='nia-category-content-container nia-content-wraper'>
      <RightPanelComponent category={props.category} selectedUseCase={selectedUseCase} activeGptDetails={activeGptDetails} />
    </div>
    </>
  )
}

export default EcommerceComponent