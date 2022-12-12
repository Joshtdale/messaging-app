// import React from 'react'
import { React, useState, useRef, useEffect } from 'react'
import './ChatWindow.css'
import Pusher from 'pusher-js';
import { useParams } from 'react-router-dom';
import { useGlobalState } from './context/GlobalState';
import request from './services/api.request';
import HeaderNav from './HeaderNav';

function ChatWindow() {
    let { chatid } = useParams();
    const [state, dispatch] = useGlobalState()
    const bottomRef = useRef(null);
    const [value, setValue] = useState('')

    let filteredMessages = state.messages.filter((item) => item.chat.id == chatid)
    let mapKey = 0

    async function handleKeyDown(event) {
        if (event.key === 'Enter') {
            // console.log(value)
            // console.log(messages)
            let options = {
                method: 'POST',
                url: 'messages/',
                data: {
                    "timestamp": Date.now(),
                    "text": value,
                    "user": {
                        "id": state.currentUser?.user_id
                    },
                    "chat": {
                        "id": chatid
                    },
                }
            }
            // console.log(options)
            // @todo: set up pusher to get messages sent. 
            let resp = await request(options);
            // dispatch({
            //     ...state,
            //     messages: [...state.messages, resp.data]
            // })
            dispatch({
                ...state,
                messages: [...state.messages, resp.data]
            })
            setValue('')
        }
    };
    function scrollBottom(){
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // console.log('scroll working')
    }
    useEffect(() => { //https://bobbyhadz.com/blog/react-scroll-to-bottom
        scrollBottom()
    // }, [state.messages]);
    }, []);
    //useMemo
    // does messages in start = socket messages

    function addMessage(msg) {
        console.log(msg)
        dispatch({
            ...state,
            messages: [...state.messages, msg]
        })
        // scrollBottom()
        setTimeout(scrollBottom, 300)
        console.log('new message')
        
    }

    useEffect(() => {
        // const pusher = new Pusher(process.env.REACT_APP_PUSHER_ENV, {
        const pusher = new Pusher('1fb64f027f5f40e81a79', {
            cluster: process.env.REACT_APP_CLUSTER
        })
        const channel1 = pusher.subscribe(process.env.REACT_APP_PUSHER_CHANNEL);
        // You can bind more channels here like this
        // const channel2 = pusher.subscribe('channel_name2')
        channel1.bind(`chat_group_${chatid}`, function (data) {
            // Code that runs when channel1 listens to a new message
            addMessage(data);
        })

        // console.log(channel1)

        return (() => {
            pusher.unsubscribe(process.env.REACT_APP_PUSHER_CHANNEL)
            // pusher.unsubscribe('channel_name2')
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <nav className='fixed-top'>
                <HeaderNav
                    chatid={chatid}
                />
            </nav>
            <div className='container-fluid chatContainer'>
                <div id='chat' className='chatWindow d-flex align-items-end justify-content-center row'>
                    {filteredMessages.map((item) => {
                        mapKey += 1
                        // console.log(item.user.id)
                        let messageClass = 'sent text-center'
                        let nameClass = 'sentName'
                        let sentRec = 'd-flex flex-row-reverse'
                        if (item.user.id !== state.currentUser.user_id) {
                            messageClass = 'received text-center'
                            nameClass = 'receivedName'
                            sentRec = ''
                        }
                        return (
                            <div key={mapKey} className={sentRec + ' chatBody row w-100'}>
                                <div className={' messageContainer col-9 p-1 mt-2'}>
                                    <div className={nameClass}>{item.user.name}🐀</div>
                                    <div className={messageClass}>{item.text}</div>
                                    {/* {console.log(item.user)} */}
                                </div>
                            </div>
                        )
                    })}
                    <div className='divRef' ref={bottomRef} />
                </div>
                <div className='row fixed-bottom'>
                    <div className="col d-flex justify-content-center m-2 pl-0">
                        <input
                            id='message'
                            placeholder='iMessage'
                            className='messageInput'
                            onKeyDown={(event) => handleKeyDown(event)}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatWindow