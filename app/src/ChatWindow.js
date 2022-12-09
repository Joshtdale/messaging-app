// import React from 'react'
import { React, useState, useRef, useEffect } from 'react'
import './ChatWindow.css'
import Pusher from 'pusher-js';

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

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            props.post('message', value, props.page)
            // console.log(value)
            message.value = ''
            // console.log(messages)
        }
    };

    useEffect(() => { //https://bobbyhadz.com/blog/react-scroll-to-bottom
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    //useMemo
    // does messages in start = socket messages

    useEffect(() => {
        // const pusher = new Pusher(process.env.REACT_APP_PUSHER_ENV, {
        const pusher = new Pusher('1fb64f027f5f40e81a79', {
            cluster: process.env.REACT_APP_CLUSTER
        })
        const channel1 = pusher.subscribe(process.env.REACT_APP_PUSHER_CHANNEL);
        // You can bind more channels here like this
        // const channel2 = pusher.subscribe('channel_name2')
        channel1.bind(`chat_group_${props.page}`, function (data) {
            console.log(data)
            // Code that runs when channel1 listens to a new message
            props.addMessage(data);
        })

        console.log(channel1)

        return (() => {
            pusher.unsubscribe(process.env.REACT_APP_PUSHER_CHANNEL)
            // pusher.unsubscribe('channel_name2')
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='container-fluid chatContainer'>
            <div id='chat' className='chatWindow d-flex align-items-end justify-content-center row'>

                {filteredMessages.map((item) => {
                    mapKey += 1
                    // console.log(item.user.id)
                    let messageClass = 'sent'
                    let sentRec = 'd-flex flex-row-reverse'
                    if (item.user.id !== props.user) {
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