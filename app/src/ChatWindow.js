import React from 'react'
import { useState } from 'react'
import './ChatWindow.css'




function ChatWindow(props) {
    // console.log(props.data[0])

    // let messages = props.data
    let mapKey = 0
    let messages = [
        {
            text: 'Hello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
            user: 2
        },
        {
            text: 'Test, Another test message',
            user: 1
        },
        {
            text: 'Test, Another test message',
            user: 1
        },
        {
            text: 'Test',
            user: 2
        },
        {
            text: 'TestHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
            user: 2
        },
        {
            text: 'Hello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
            user: 1
        },
    ]

    const [value, setValue] = useState('')
    const message = document.getElementById('message')

    function handleKeyDown(event){
        if (event.key === 'Enter') {
            props.post(value)
            // console.log(value)
            message.value = ''
            // console.log(messages)
        }
    };

    return (
        <div className='container-fluid chatContainer'>
            <div className='chatWindow d-flex align-items-end justify-content-center row'>
                    {messages.map((item) => {
                        mapKey += 1
                        // console.log(item.user.id)
                        let messageClass = 'sent'
                        let sentRec = 'd-flex flex-row-reverse'
                        if (item.user !== props.user){
                            messageClass = 'received'
                            sentRec = ''
                            
                        }
                        return (
                            <div key={mapKey} className={sentRec + ' chatBody row w-100'}>
                                <div className={' messageContainer col-9 p-1'}>
                                    <div className={messageClass}>{item.text}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='row fixed-bottom'>
                    <div className="col d-flex justify-content-center m-2">
                        <input id='message' placeholder='iMessage' className='messageInput' onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />
                    </div>
                </div>
        </div>
    )
}

export default ChatWindow