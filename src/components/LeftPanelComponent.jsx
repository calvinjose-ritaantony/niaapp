import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatHeadList } from '../redux/actions/ChatConversationAction';

const chatHeadLists = [
    {
        id: 1,
        name: "Searching Orders"
    },
    {
        id: 2,
        name: "Summarize Product Review"
    },
    {
        id: 3,
        name: "Track Orders"
    },
    {
        id: 4,
        name: "Product Information"
    },
    {
        id: 5,
        name: "Generate Mail Orders"
    },
    {
        id: 6,
        name: "Review Bytes"
    },
    {
        id: 7,
        name: "DOC Search"
    },
]

const LeptPanelComponent = (props) => {
  const chatHead = useSelector((state)=>state.chatListData.chatHead);
  const userData = useSelector((state)=>state.userList.userInfo);
  const [chatHeadList, setChatHeadList] = useState(chatHead.length > 0 ? chatHead : chatHeadLists);
  const dispatch = useDispatch();
  const getChatHead = async() =>{
    const chatHeadListData = userData ? await dispatch(getChatHeadList(1)) : '';
  }
  useEffect(()=>{
    getChatHead();
  },[]);
  return (
    <div className='nia-left-panel-container'>
        <div className='nia-left-panel-list'>
            <ul>
                {chatHeadList && chatHeadList.map((item,i)=> <li key={item.id} className={`${item.name === props.selectedList ? 'active' : ''}`} onClick={()=>props.selectListHandler(item.name)}>{item.name}</li> )}
            </ul>
        </div>
    </div>
  )
}

export default LeptPanelComponent