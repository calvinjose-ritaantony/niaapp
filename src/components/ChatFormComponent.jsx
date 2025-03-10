import React, { useEffect, useState } from "react";
import Send_Icon from "/images/paperplane.svg";
import Attach_Icon from "/images/paperclip.svg";
import pdfthumbnail from "/images/pdf.png";
import wordthumbnail from "/images/word.png";
import excelthumbnail from "/images/excel.png";
import unknownthumbnail from "/images/question.png";
import Config_Icon from "/images/settings-arrows.svg";
import {
  getChatHistoryAction,
  postChatAction,
} from "../redux/actions/ChatConversationAction";
import { useDispatch } from "react-redux";
import { CHAT_ATTACHEMENT_SUCCESS, CHAT_INPUT_SUCCESS } from "../redux/constants/chatConstants";

import {
  GET_LOADING_HIDE,
  GET_LOADING_SHOW,
} from "../redux/constants/commonConstants";
import { MarkdownToHtml } from "./MarkdownToHtml";



const ChatFormComponent = (props) => {
  const [textRows, setTextRows] = useState(1);
  const [chatInput, setChatInput] = useState("");
  const [chatFile, setChatFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailType, setthumbnailType] = useState(null);
  const [params, setParams] = useState({max_tokens:"800",temperature:"0.7",top_p:"0.95",frequency_penalty:"0",presence_penalty:"0"});
  const [gptId, setGptId] = useState(props.activeGptDetails?._id);
  const [gptName, setGptName] = useState(props.activeGptDetails?.name);
  const [showConfig, setShowConfig] = useState(false);

  const dispatch = useDispatch();

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setChatFile(selectedFile);
      // If the file is an image, generate a thumbnail preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // Set the image preview
        setthumbnailType(selectedFile.type); // Set the image preview
      };
      reader.readAsDataURL(selectedFile); // Read file as Data URL for image preview
    }
  };

  const removeFile = () => {
    setChatFile(null);
    setThumbnail(null);
  };

  const submitHandler = async () => {
    const defaultFile = new Blob(["dummy"], {
      type: "application/octet-stream",
    });
    const formData = new FormData();
    props.scrollToTop();
    formData.append("user_message", chatInput);
    formData.append("uploadedImage", chatFile ? chatFile : defaultFile);
    formData.append("params", JSON.stringify(params));
    dispatch({ type: CHAT_INPUT_SUCCESS, payload: chatInput});
    if(chatFile){
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: CHAT_ATTACHEMENT_SUCCESS, payload: reader.result});
      };
      reader.readAsDataURL(chatFile);
    }
    
    
    //dispatch({type: GET_LOADING_SHOW});
    setChatInput("");
    setChatFile(null);
    setThumbnail(null);
    const data = await dispatch(postChatAction(formData, gptId, gptName));
    const getChatHistory = await dispatch(getChatHistoryAction(gptId, gptName));
    dispatch({ type: CHAT_ATTACHEMENT_SUCCESS, payload: null});
    props.scrollToTop();
    //dispatch({type: GET_LOADING_HIDE});
    dispatch({ type: CHAT_INPUT_SUCCESS, payload: null });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      props.scrollToTop();
      event.preventDefault();
      submitHandler();
    }
  };

  const updateConfiguration = (field, value) => {
    setParams({ ...params, [field]: value });
  };



  return (
    <div
      className={`nia-chat-input-container ${textRows > 1 ? "focused" : ""}`}
    >
      {showConfig && (
        <div className="nia-config-options d-flex">
          <div className="pe-3">Configuration<br/>Parameters</div>
          <div className="flex-grow-1 d-flex gap-2">
            <div className="w-100">
              <label htmlFor="max-response" className="form-label">
                Max Response:<span className="text-primary"> ({params.max_tokens})</span>
              </label>
              <div className="position-relative">
                <input
                  type="range"
                  className="form-range"
                  id="max-response"
                  min="0"
                  max="1000"
                  step="1"
                  value={params.max_tokens}
                  onChange={(e) =>
                    updateConfiguration("max_tokens", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-100">
              <label htmlFor="temperature" className="form-label">
                Temperature:<span className="text-primary"> ({params.temperature})</span>
              </label>
              <div className="position-relative">
                <input
                  type="range"
                  className="form-range"
                  id="temperature"
                  min="0"
                  max="1"
                  step="0.1"
                  value={params.temperature}
                  onChange={(e) =>
                    updateConfiguration("temperature", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-100">
              <label htmlFor="top-p" className="form-label">
                Top P:<span className="text-primary"> ({params.top_p})</span>
              </label>
              <div className="position-relative">
                <input
                  type="range"
                  className="form-range"
                  id="top-p"
                  min="0"
                  max="1"
                  step="0.05"
                  value={params.top_p}
                  onChange={(e) => updateConfiguration("top_p", e.target.value)}
                />
              </div>
            </div>
            <div className="w-100">
              <label htmlFor="frequency-penalty:" className="form-label">
                Frequency Penalty:<span className="text-primary"> ({params.frequency_penalty})</span>
              </label>
              <div className="position-relative">
                <input
                  type="range"
                  className="form-range"
                  id="frequency-penalty:"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={params.frequency_penalty}
                  onChange={(e) =>
                    updateConfiguration("frequency_penalty", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-100">
              <label htmlFor="presence-penalty" className="form-label">
                Presence Penalty:<span className="text-primary"> ({params.presence_penalty})</span>
              </label>
              <div className="position-relative">
                <input
                  type="range"
                  className="form-range"
                  id="presence-penalty"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={params.presence_penalty}
                  onChange={(e) =>
                    updateConfiguration("presence_penalty", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <label htmlFor="chat-input">
        <textarea
          type="text"
          placeholder="Start Conversation"
          name="chat-input"
          id="chat-input"
          className="nia-input-text"
          rows={textRows}
          value={chatInput}
          onFocus={() => setTextRows(5)}
          onBlur={() => setTextRows(1)}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleKeyPress}
        >
          {chatInput}
        </textarea>
      </label>
      <div className="nia-chat-btn-container">
        {thumbnail && (
          <div className="attachement-container">
            {
              chatFile && <>
                {thumbnailType.startsWith('image/') ? <img src={thumbnail} alt="Selected Image" /> : 
                thumbnailType === 'application/pdf' ? <img src={pdfthumbnail} alt="PDF file" /> : 
                (thumbnailType === 'application/msword' || thumbnailType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ? <img src={wordthumbnail} alt="Word Document" /> : 
                (thumbnailType === 'application/vnd.ms-excel' || thumbnailType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? <img src={excelthumbnail} alt="Excel File" /> : 
                <img src={unknownthumbnail} alt="Unknown file" />
                }
              </>
              }
            {/* <img src={thumbnail} alt="Thumbnail" /> */}
            <div className="delete-file" onClick={removeFile}></div>
          </div>
        )}
        <button className="btn nia-chat-btn" onClick={submitHandler}>
          <img src={Send_Icon} alt={"Send"} />
        </button>
        <button className="btn nia-chat-btn">
          <input
            type="file"
            name="nia-attachment"
            id="nia-attachment"
            className="nia-chat-attachment"
            onChange={handleFileChange}
          />
          <img src={Attach_Icon} alt={"Attach"} />
        </button>
        <button
          className="btn nia-chat-btn"
          onClick={() => setShowConfig(!showConfig)}
        >
          <img src={Config_Icon} alt={"Config"} />
        </button>
      </div>
    </div>
  );
};

export default ChatFormComponent;
