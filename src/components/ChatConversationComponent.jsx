import React, { Fragment, useEffect, useState } from "react";
import ChatListComponent from "./ChatListComponent";
import { useDispatch, useSelector } from "react-redux";
import { getChatHistoryAction } from "../redux/actions/ChatConversationAction";
import Think from "/images/umm.gif";
import {
  GET_LOADING_HIDE,
  GET_LOADING_SHOW,
} from "../redux/constants/commonConstants";

const ChatConversationComponent = (props) => {
  const [chatHistory, setChatHistory] = useState([]);
  const getChathistoryData = useSelector(
    (state) => state.chatListData?.chatList
  );
  const getChatInput = useSelector((state) => state.chatListData?.chatInput);
  const getChatAttached = useSelector(
    (state) => state.chatListData?.chatAttachement
  );

  const dispatch = useDispatch();

  const getChatHistory = async () => {
    if (props.activeGptDetails?._id && props.activeGptDetails?.description) {
      let showload;
      if (!getChatInput) {
        dispatch({ type: GET_LOADING_SHOW });
        showload = true;
      }
      props.scrollToTop();
      const chatHistoryData = await dispatch(
        getChatHistoryAction(
          props.activeGptDetails?._id,
          props.activeGptDetails?.name,
          props.selectedUseCase ? props.selectedUseCase._id : null
        )
      );
      if (showload) {
        dispatch({ type: GET_LOADING_HIDE });
      }
      if (chatHistoryData && chatHistoryData.length > 0) {
        setChatHistory(chatHistoryData);
      } else {
        setChatHistory([]);
      }
      props.scrollToTop();
    }
  };

  useEffect(() => {
    getChatHistory();
  }, [props.selectedUseCase, props.activeGptDetails]);

  useEffect(() => {
    setChatHistory(getChathistoryData);
  }, [getChathistoryData]);

  return (
    <div className="nia-chat-list">
      {chatHistory.length > 0 &&
        chatHistory.map((chatData, i) => (
          <Fragment key={i}>
            <ChatListComponent chatData={chatData} />
          </Fragment>
        ))}
      {getChatInput ? (
        <ChatListComponent chatData={{ role: "user", content: getChatInput }} />
      ) : (
        ""
      )}
      {getChatAttached ? (
        <ChatListComponent
          chatData={{ role: "user", content: getChatAttached }}
        />
      ) : (
        ""
      )}
      {getChatInput && (
        <div className="nia-chat-list-item">
          <div className="nia-chat-list-a">
            <div className="nia-chat-profile">NIA</div>
            <div className="nia-chat-answer p-0" style={{ background: "none" }}>
              <img src={Think} height={35} width={30} /> Thinking ...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatConversationComponent;
