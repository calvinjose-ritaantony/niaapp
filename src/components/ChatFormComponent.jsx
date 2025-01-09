import React, { useState } from 'react'
import Send_Icon from '/images/paperplane.svg';
import Attach_Icon from '/images/paperclip.svg';
import Config_Icon from '/images/settings-arrows.svg';

const ChatFormComponent = () => {
  const [textRows, setTextRows] = useState(1);
  return (
    <div className={`nia-chat-input-container ${textRows>1 ? 'focused' : ''}`}>
                <label htmlFor="chat-input"><textarea type="text" placeholder="Start Conversation" name="chat-input" id="chat-input" className="nia-input-text" rows={textRows} onFocus={()=>setTextRows(5)} onBlur={()=>setTextRows(1)} >
                </textarea>
                </label>
                <div className="nia-chat-btn-container">
                  <button className="btn nia-chat-btn"><img src={Send_Icon} alt={'Send'} /></button>
                  <button className="btn nia-chat-btn">
                    <input type="file" name="nia-attachment" id='nia-attachment' className='nia-chat-attachment' />
                    <img src={Attach_Icon} alt={'Attach'} />
                  </button>
                  <button className="btn nia-chat-btn"><img src={Config_Icon} alt={'Config'} /></button>
                </div>
              </div>
  )
}

export default ChatFormComponent