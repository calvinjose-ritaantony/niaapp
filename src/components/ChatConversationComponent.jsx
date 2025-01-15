import React, { Fragment, useEffect, useState } from 'react';
import ChatListComponent from './ChatListComponent';
import { useDispatch } from 'react-redux';
import { getChatHistoryAction } from '../redux/actions/ChatConversationAction';


const ChatConversationComponent = (props) => {
  const [chatHistory, setChatHistory] = useState([]);
  const dispatch = useDispatch();

  const getChatHistory = async() =>{
    if(props.activeGptDetails?._id && props.activeGptDetails?.name){
      const chatHistoryData = await dispatch(getChatHistoryAction(props.activeGptDetails?._id, props.activeGptDetails?.name));
      if(chatHistoryData){
        setChatHistory(chatHistoryData);
      }
    }
    
  }

  useEffect(()=>{
    getChatHistory();
  },[props.selectedUseCase]);


  return (
    <div className='nia-chat-list'>
        {chatHistory.length > 0 && chatHistory.map((chatData, i)=><Fragment key={i}><ChatListComponent chatData={chatData} /></Fragment>) }
        <ChatListComponent />
        <ChatListComponent />
        <ChatListComponent />
        <ChatListComponent />
    </div>
  )
}

export default ChatConversationComponent