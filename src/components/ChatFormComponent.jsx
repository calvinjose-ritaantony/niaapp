import React, { useState } from "react";
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
import {
  CHAT_ATTACHEMENT_SUCCESS,
  CHAT_INPUT_SUCCESS,
} from "../redux/constants/chatConstants";

import ChatFormParametersComponent from "./ChatFormParametersComponent";

const ChatFormComponent = (props) => {
  const [textRows, setTextRows] = useState(1);
  const [chatInput, setChatInput] = useState("");
  const [chatFile, setChatFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailType, setthumbnailType] = useState(null);
  const [params, setParams] = useState({
    max_tokens: "800",
    temperature: "0.7",
    top_p: "0.95",
    frequency_penalty: "0",
    presence_penalty: "0",
  });
  const [gptId, setGptId] = useState(props.activeGptDetails?._id);
  const [gptName, setGptName] = useState(props.activeGptDetails?.name);
  const [showConfig, setShowConfig] = useState(false);
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setChatFile(selectedFile);
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
    dispatch({ type: CHAT_INPUT_SUCCESS, payload: chatInput });
    if (chatFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({ type: CHAT_ATTACHEMENT_SUCCESS, payload: reader.result });
      };
      reader.readAsDataURL(chatFile);
    }

    setChatInput("");
    setChatFile(null);
    setThumbnail(null);
    const data = await dispatch(postChatAction(formData, props.activeGptDetails?._id,
      props.activeGptDetails?.description));
    const getChatHistory = await dispatch(
      // getChatHistoryAction(gptId, gptName, true)
      getChatHistoryAction(
        props.activeGptDetails?._id,
        // props.activeGptDetails?.description,
        props.activeGptDetails?.name,
        props.selectedUseCase ? props.selectedUseCase._id : null
      )
    );
    dispatch({ type: CHAT_ATTACHEMENT_SUCCESS, payload: null });
    props.scrollToTop();
    dispatch({ type: CHAT_INPUT_SUCCESS, payload: null });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      props.scrollToTop();
      event.preventDefault();
      submitHandler();
    }
  };

  const updateParams = (paramsData) => {
    setParams({ ...paramsData });
  };

  return (
    <div
      className={`nia-chat-input-container ${textRows > 1 ? "focused" : ""}`}
    >
      {showConfig && <ChatFormParametersComponent updateParams={updateParams} />}
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
            {chatFile && (
              <>
                {thumbnailType.startsWith("image/") ? (
                  <img src={thumbnail} alt="Selected Image" />
                ) : thumbnailType === "application/pdf" ? (
                  <img src={pdfthumbnail} alt="PDF file" />
                ) : thumbnailType === "application/msword" ||
                  thumbnailType ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                  <img src={wordthumbnail} alt="Word Document" />
                ) : thumbnailType === "application/vnd.ms-excel" ||
                  thumbnailType ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                  <img src={excelthumbnail} alt="Excel File" />
                ) : (
                  <img src={unknownthumbnail} alt="Unknown file" />
                )}
              </>
            )}
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
