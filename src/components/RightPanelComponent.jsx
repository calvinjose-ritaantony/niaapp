import React, { useEffect, useRef, useState } from 'react';

import ChatConversationComponent from "./ChatConversationComponent";
import ChatFormComponent from './ChatFormComponent';
import { useDispatch, useSelector } from 'react-redux';
import { clearChatHistoryAction } from '../redux/actions/ChatConversationAction';
import LoaderComponent from '../sharedComponent/LoaderComponent';
// import ThinkingAnimation from '../sharedComponent/ThinkingAnimation';
// import Think from '/images/umm.gif'

const RightPanelComponent = (props) => {
  const [gptId, setGptId] = useState(props.activeGptDetails?._id);
  const [gptName, setGptName] = useState(props.activeGptDetails?.name);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const {loading} = useSelector(state=> state.commonData);
  const clearAllChat = async() =>{
    const clearChatHistory = await dispatch(clearChatHistoryAction(gptId, gptName));
    scrollToTop();
  }

  const scrollToTop = () => {
    // if (chatContainerRef.current) {
    //   console.log("scroll to top1");
    //   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    // }
    // const div = document.getElementById('scrollableDiv');
    // div.scrollTop = div.scrollHeight;
  };

  const handleScrollToBottom = () => {
    const div = document.getElementById('scrollableDiv');
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  };

  useEffect(() => {
    // Create a MutationObserver to detect changes in the div
    const observer = new MutationObserver(handleScrollToBottom);

    const div = document.getElementById('scrollableDiv');
    if (div) {
      // Start observing the div for changes in its child nodes (content changes)
      observer.observe(div, {
        childList: true, // Observe changes to the children of the div
        subtree: true,   // Observe all descendants, not just direct children
        attributes: true, // Optionally observe changes to attributes like height
      });
    }

    // Cleanup observer on component unmount
    return () => {
      if (observer && div) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="nia-right-panel-container">
          <div className="nia-right-panel-header">
            <div className="nia-right-panel-header-text">{props.selectedUseCase?.name}</div>
            <div className="nia-clear-chat nia-chat-btn" onClick={clearAllChat}>Clear all</div>
          </div>
          <div className="nia-right-panel-content"> 
            <div className="nia-chat-conatiner" ref={chatContainerRef} id="scrollableDiv">
              <ChatConversationComponent selectedUseCase={props.selectedUseCase} activeGptDetails={props.activeGptDetails} scrollToTop={scrollToTop} />
            </div>
          </div>
          {/* 
          <ThinkingAnimation /> */}
          {/* <img src={Think} height={50} width={50} /> */}
          <div className="nia-right-panel-form">
            <div className="nia-chat-form-container">
              <ChatFormComponent activeGptDetails={props.activeGptDetails} scrollToTop={scrollToTop} />
            </div>
          </div>
          { loading > 0 && <LoaderComponent /> }
        </div>
  )
}

export default RightPanelComponent