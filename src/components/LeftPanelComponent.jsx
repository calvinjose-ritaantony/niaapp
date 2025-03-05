import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUpdateInstructionAction, getUsecaseAction } from '../redux/actions/ChatConversationAction';
import { formateChatHeadText } from '../utils/sharedFunction';

const menuList = [
  {
    name : 'Marketing ',
    useCases : ["GENERATE_MAIL_PROMOTION"]
  },{
    name: 'Commerce', 
    useCases : [
      "SUMMARIZE_PRODUCT_REVIEWS",
      "PRODUCT_INFORMATION",
      "PRODUCT_COMPARISON",
      "CUSTOMIZED_RECOMMENDATIONS"
    ]
  },{
    name : 'Orders',  
    useCases : [
      "SEARCHING_ORDERS",
      "TRACK_ORDERS",
      "GENERATE_MAIL_ORDERS"
    ]
  },{
    name : 'ITSM',
    useCases : [
      "HANDLE_FAQS",
      "CUSTOMER_COMPLAINTS",
      "DOC_SEARCH",
      "ANALYZE_SPENDING_PATTERNS",
      "GENERATE_REPORTS"
    ]
 
  
  }
]

const LeftPanelComponent = (props) => {
  const chatHead = useSelector((state)=>state.chatListData.chatHead);
  const userData = useSelector((state)=>state.userList.userInfo);
  const [selectedUseCase, setSelectedUseCase] = useState({});
  const [chatHeadList, setChatHeadList] = useState("");
  const [selectedChatHead, setSelectedChatHead] = useState("");
  const [selectedUseCaseHead, setSelectedUseCaseHead] = useState("");
  const [useCaseHeadList, setUseCaseHeadList] = useState("");
  const usecaseData = useSelector(state=>state.chatListData.chatUsecase);
  const dispatch = useDispatch();
  const getChatHead = async() =>{
    const chatHeadListData = props.activeGptDetails?._id && await dispatch(getUsecaseAction(props.activeGptDetails?._id));
  }
  useEffect(()=>{
    getChatHead();
  },[props.activeGptDetails]);

  useEffect(()=>{
    setChatHeadList(usecaseData);
    const selectedUseCaseData = usecaseData.find((item)=>item.name === menuList[0]?.useCases?.[0]);
    setSelectedUseCase(selectedUseCaseData);
    props.selectListHandler(selectedUseCaseData);
    setSelectedChatHead(menuList[0].name);
    setSelectedUseCaseHead(menuList[0]?.useCases?.[0]);
  },[usecaseData]);

  const selectUseCase = async(item) => {
    const updateChatCase = await dispatch(getUpdateInstructionAction(props.activeGptDetails?._id, props.activeGptDetails?.name, item._id))
    setSelectedUseCase(item);
    props.selectListHandler(item);
  }


  const checkMenuActive = (list) => {
    if(selectedChatHead === list.name){
      return true;
    }else{
      return false
    }
  }
  const checkLevel2MenuActive = (item) => {
    if(selectedUseCaseHead === item){
      return true;
    }else{
      return false
    }
  }

  const toggleMainMenu = (list) => {
    setSelectedChatHead(list.name);
    let item = 
    toggleLevel2Menu(list, list.useCases?.[0]);
    //setSelectedUseCaseHead(list.useCases?.[0]);
  }
  const toggleLevel2Menu = (list, item) => {
    setSelectedChatHead(list.name);
    setSelectedUseCaseHead(item);
    const selectedChatHeadDetails = chatHeadList.find((items)=>items.name === item);
    selectUseCase(selectedChatHeadDetails);
  }

  return (
    <div className='nia-left-panel-container'>
        <div className='nia-left-panel-list'>
            <ul className='nia-left-main-menu'>
                {/* {chatHeadList && chatHeadList.map((item,i)=> <Fragment  key={item._id}>
                <li className={`${item.name === selectedUseCase.name ? 'active' : ''}`} onClick={()=>selectUseCase(item)}>{formateChatHeadText(item.name)}
                    </li>
                    </Fragment>
                 )} */}

                 {menuList && menuList.map((list, i)=><Fragment key={`leftMainMenu_${i}`}>
                  <li className={checkMenuActive(list) ? 'active' : ''} onClick={()=>toggleMainMenu(list)} >
                    {formateChatHeadText(list.name)}
                  </li>
                  {list.useCases && list.useCases.length > 0 && <ul>
                    {list.useCases.map((item,j)=><Fragment key={`level2_${j}`}>
                      <li className={checkLevel2MenuActive(item) ? 'active' : ''} onClick={()=>{toggleLevel2Menu(list, item)}}>
                      {formateChatHeadText(item)}
                      </li>
                    </Fragment>)}
                  </ul>}
                 </Fragment>)}
            </ul>
        </div>
    </div>
  )
}

export default LeftPanelComponent