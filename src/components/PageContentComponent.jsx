import React, { useState } from "react";
import RightPanelComponent from "./RightPanelComponent";
import LeftPanelComponent from "./LeftPanelComponent";


const PageContentComponent = (props) => {
  const [selectedList, setSelectedList] = useState('Searching Orders');
  
  const selectListHandler = (listData) => {
    setSelectedList(listData);
  }
  return (
    <div className="nia-body">
      <div
        className={`nia-body-left-panel ${
          props.showLeftPanel ? "nia-show-left-panel" : ""
        }`}
      >
        <div className="nia-left-panel-container">
          <LeftPanelComponent selectListHandler={selectListHandler} selectedList={selectedList} />
        </div>
      </div>
      <div className="nia-body-right-panel">
        <RightPanelComponent selectedList={selectedList} />
      </div>
    </div>
  );
};

export default PageContentComponent;
