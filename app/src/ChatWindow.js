// import React from 'react'
import { React, useState, useRef, useEffect } from 'react'
import './ChatWindow.css'


function ChatWindow(props) {
    const bottomRef = useRef(null);



    let messages = props.data
    let filteredMessages = messages.filter((item) => item.chat.id === props.page)
    // console.log(filteredMessages)
    let mapKey = 0
    // let messages = [
    //     {
    //         text: 'Hello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
    //         user: 2
    //     },
    //     {
    //         text: 'Test, Another test message',
    //         user: 1
    //     },
    //     {
    //         text: 'Test, Another test message',
    //         user: 1
    //     },
    //     {
    //         text: 'Test',
    //         user: 2
    //     },
    //     {
    //         text: 'TestHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
    //         user: 2
    //     },
    //     {
    //         text: 'Hello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
    //         user: 1
    //     },
    //     {
    //         text: 'Test, Another test message',
    //         user: 1
    //     },
    //     {
    //         text: 'Test',
    //         user: 2
    //     },
    //     {
    //         text: 'TestHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
    //         user: 2
    //     },
    //     {
    //         text: 'Hello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more textHello, This is more text',
    //         user: 1
    //     },
    // ]

    const [value, setValue] = useState('')
    const message = document.getElementById('message')

    function handleKeyDown(event){
        if (event.key === 'Enter') {
            props.post('message', value, props.page)
            // console.log(value)
            message.value = ''
            // console.log(messages)
        }
    };

     useEffect(() => { //https://bobbyhadz.com/blog/react-scroll-to-bottom
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    //useMemo
    // does messages in start = socket messages

    return (
        <div className='container-fluid chatContainer'>
            <div id='chat' className='chatWindow d-flex align-items-end justify-content-center row'>
    
                    {filteredMessages.map((item) => {
                        mapKey += 1
                        // console.log(item.user.id)
                        let messageClass = 'sent'
                        let sentRec = 'd-flex flex-row-reverse'
                        if (item.user.id !== props.user){
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
                    <div ref={bottomRef} />
                </div>
                <div className='row fixed-bottom'>
                    <div className="col d-flex justify-content-center m-2 pl-0">
                        <input id='message' placeholder='iMessage' className='messageInput' onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />
                    </div>
                </div>
        </div>
    )
}

export default ChatWindow