import React from 'react';
import OptionVertical from '/images/options-vertical.svg';
import EditOption from '/images/edit.svg';
import DeleteOption from '/images/delete.svg';
const ChatListComponent = () => {
  return (
    <div className='nia-chat-list-item'>
            <div className='nia-chat-list-q'>
                <div className='nia-chat-question'>Chat question goes here</div>
                {/* <div className='nia-chat-action'>
                    <div className='nia-chat-action-btn'><img src={OptionVertical} alt={'Action'} /></div>
                    <div className='nia-chat-action-list'>
                        <ul>
                            <li><img src={EditOption} alt={'Edit'} /><span>Edit</span></li>
                            <li><img src={DeleteOption} alt={'Clear'} /><span>Clear</span></li>
                        </ul>
                    </div>
                </div> */}
            </div>
            <div className='nia-chat-list-a'>
                <div className='nia-chat-profile'>NIA</div>
                <div className='nia-chat-answer'>
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                </div>
            </div>
        </div>
  )
}

export default ChatListComponent