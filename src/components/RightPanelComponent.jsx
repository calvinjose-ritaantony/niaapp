import React, { useEffect, useRef, useState } from "react";

import ChatConversationComponent from "./ChatConversationComponent";
import ChatFormComponent from "./ChatFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { clearChatHistoryAction } from "../redux/actions/ChatConversationAction";
import LoaderComponent from "../sharedComponent/LoaderComponent";
import { formateChatHeadText } from "../utils/sharedFunction";
import { menuList } from "../utils/menuList";

const RightPanelComponent = (props) => {
  const [gptId, setGptId] = useState(props.activeGptDetails?._id);
  const [gptName, setGptName] = useState(props.activeGptDetails?.name);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commonData);
  const clearAllChat = async () => {
    const clearChatHistory = await dispatch(
      clearChatHistoryAction(gptId, gptName)
    );
    scrollToTop();
  };

  const scrollToTop = () => {
    // if (chatContainerRef.current) {
    //   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    // }
    // const div = document.getElementById('scrollableDiv');
    // div.scrollTop = div.scrollHeight;
  };

  const handleScrollToBottom = () => {
    const div = document.getElementById("scrollableDiv");
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(handleScrollToBottom);

    const div = document.getElementById("scrollableDiv");
    if (div) {
      observer.observe(div, {
        childList: true, // Observe changes to the children of the div
        subtree: true, // Observe all descendants, not just direct children
        attributes: true, // Optionally observe changes to attributes like height
      });
    }
    return () => {
      if (observer && div) {
        observer.disconnect();
      }
    };
  }, []);
  return (
    <div className="nia-category-content">
      <div className="nia-category-content-header">
        <div className="nia-category-content-text">
          {menuList
            ?.find((itm) => itm.name === props.category)
            ?.["useCases"]?.find(
              (itm) => itm.name === props.selectedUseCase?.name
            )?.["label"] || ""}
        </div>
        <div className="nia-clear-chat nia-chat-btn" onClick={clearAllChat}>
          Clear all
        </div>
      </div>
      <div className="nia-category-content-chat">
        <div
          className="nia-chat-conatiner"
          ref={chatContainerRef}
          id="scrollableDiv"
        >
          <ChatConversationComponent
            selectedUseCase={props.selectedUseCase}
            activeGptDetails={props.activeGptDetails}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>

      <div className="nia-right-panel-form">
        <div className="nia-chat-form-container">
          <ChatFormComponent
            selectedUseCase={props.selectedUseCase}
            activeGptDetails={props.activeGptDetails}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
      {loading > 0 && <LoaderComponent />}
    </div>
  );
};

export default RightPanelComponent;
