import React from 'react';

import ChatConversationComponent from "./ChatConversationComponent";
import ChatFormComponent from './ChatFormComponent';

const RightPanelComponent = (props) => {
  
  return (
    <div className="nia-right-panel-container">
          <div className="nia-right-panel-header">
            <div className="nia-right-panel-header-text">{props.selectedList}</div>
            <div className="nia-clear-chat nia-chat-btn">Clear all</div>
          </div>
          <div className="nia-right-panel-content">
            <div className="nia-chat-conatiner">
              <ChatConversationComponent />
            </div>
          </div>
          <div className="nia-right-panel-form">
            <div className="nia-chat-form-container">
              <ChatFormComponent />
            </div>
          </div>
        </div>
  )
}

export default RightPanelComponent