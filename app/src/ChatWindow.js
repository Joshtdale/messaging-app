import React from 'react'
import { useState } from 'react'
import './ChatWindow.css'




function ChatWindow() {
    let messages = [
        {
            text: 'Hello, This is more text',
            user_id: 2
        },
        {
            text: 'Test, Another test message',
            user_id: 1
        },
        {
            text: 'Test, Another test message',
            user_id: 1
        },
        {
            text: 'Test',
            user_id: 2
        },
        {
            text: 'Test',
            user_id: 2
        },
        {
            text: 'Test',
            user_id: 1
        },
    ]

    const [value, setValue] = useState('')
    const message = document.getElementById('message')

    function handleKeyDown(event){
        if (event.key === 'Enter') {
            console.log(value)
            // messages.push(value)
            message.value = ''
            // console.log(messages)
        }
    };

    return (
        <div className='container-fluid chatContainer'>
            <div className='chatWindow d-flex align-items-end row'>
                    {messages.map((item) => {
                        let messageClass = 'sent'
                        if (item.user_id !== 1){
                            messageClass = 'received'
                        }
                        return (
                            <div className='chatBody row'>
                                <div className='messageContainer p-1'>
                                    <div className={messageClass}>{item.text}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            <input id='message' placeholder='iMessage' className='messageInput' onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}

export default ChatWindow