// import React from 'react'
import { React, useState, useRef, useEffect } from 'react'
import './ChatWindow.css'
import Pusher from 'pusher-js';
import { useParams } from 'react-router-dom';
import { useGlobalState } from './context/GlobalState';
import request from './services/api.request';
import HeaderNav from './HeaderNav';
import createButton from './images/create.png'

function ChatWindow() {
    let { chatid } = useParams();
    const [state, dispatch] = useGlobalState()
    const bottomRef = useRef(null);
    const [value, setValue] = useState('')
    const [sendWatcher, setSendWatcher] = useState(false)
    const [page, setPage] = useState('chat')
    const [chatMembers, setChatMembers] = useState([])
    // const [messageState, setMessage] = useState

    let filteredMessages = state.messages.filter((item) => item.chat.id == chatid)
    let mapKey = 0

    // useEffect(() => {
    //     console.log('reload UseEffect')
    // },[state])

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
            console.log('resp.data', resp.data)

            dispatch({
                ...state,
                messages: [...state.messages, resp.data]
            })
            setSendWatcher(!sendWatcher)
            setValue('')
        }
    };
    function scrollBottom() {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        // console.log('scroll working')
    }
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        // const pusher = new Pusher('1fb64f027f5f40e81a79', {
        cluster: process.env.REACT_APP_CLUSTER
    })
    useEffect(() => { //https://bobbyhadz.com/blog/react-scroll-to-bottom
        // console.log(process.env.REACT_APP_PUSHER_KEY)
        const channel1 = pusher.subscribe(process.env.REACT_APP_PUSHER_CHANNEL);
        // You can bind more channels here like this
        // const channel2 = pusher.subscribe('channel_name2')
        channel1.bind(`chat_group_${chatid}`, function (data) {
            // Code that runs when channel1 listens to a new message
            addMessage(data);
        })
        setTimeout(scrollBottom, 300)

        // console.log(channel1)

        return (() => {
            pusher.unsubscribe(process.env.REACT_APP_PUSHER_CHANNEL)
            // pusher.unsubscribe('channel_name2')
        })
        // }, [state.messages]);
    }, [pusher]);

    // useEffect(() => {
    //     async function getMessages() {
    //         let msgResp = await request({
    //             url: '/messages',
    //             method: 'GET',
    //         })
    //         dispatch({
    //             ...state,
    //             messages: msgResp.data,
    //         })
    //     }

    //     getMessages()
    //     setTimeout(scrollBottom, 300)
    // }, [pusher])
    //useMemo
    // does messages in start = socket messages

    function addMessage(msg) {
        // console.log(msg.user.id)
        // console.log('logged in user', state.currentUser.user_id)
        if (msg.user.id !== state.currentUser.user_id) {
            console.log('msg', msg)
            console.log(state.messages)
            dispatch({
                ...state,
                messages: [...state.messages, msg]
            })
        }

    }

    let memberCount = 0

    async function SetChatMembers() {
        let map = chatMembers.map((item) => {
            return(
                {
                    "id": item
                }
            )
        })
        // console.log(map)
        let options = {
            method: 'PUT',
            url: 'groups/' + chatid + '/',
            data: {
                "user": map
            }
        }
        // console.log(options)
        await request(options);
        // console.log(value)
        // renameInput.value = ''
        // setName('stuff')
        // props.getData()
        memberCount = 0
    }

// console.log(state.chats)
    function addUser(id) {
        console.log(count)
        if (memberCount === 0) {
            setChatMembers(...chatMembers, state.currentUser.user_id)
        }

        // let oldMembers = chatMembers
        // setChatMembers([...chatMembers, state.currentUser.user_id])
        setChatMembers([...chatMembers, id])
        memberCount += 1
        // console.log(id)
        // let options = {
        //     method: 'PUT',
        //     url: 'groups/' + props.chatid + '/',
        //     data: {
        //         "user": {

        //         }
        //     }
        // }
        // // console.log(options)
        // await request(options);
        // // console.log(value)
        // renameInput.value = ''
        // setName('stuff')
        // props.getData()
    }

    console.log(chatMembers)
    console.log(state.chats)

    function Messages() {
        return (
            <>
                {filteredMessages.map((item) => {
                    mapKey += 1
                    // console.log(item.user.id)
                    let messageClass = 'sent'
                    let nameClass = 'sentName'
                    let sentRec = 'd-flex flex-row-reverse'
                    if (item.user.id !== state.currentUser.user_id) {
                        messageClass = 'received'
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

            </>
        )
    }

    function Users() {
        return (
            <>
                {state.users.map((item) => {
                    mapKey += 1

                    return (
                        <div key={mapKey} className='row  d-flex align-items-center justify-content-center w-100'>
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <img onClick={() => addUser(item.id)} className='createBtn' src={createButton} alt="Add" />
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                <div className='text-center btn text-light'>{item.username}</div>

                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-center">
                                {/* <div className='text-center btn text-light'>{item.first_name} - {item.username}</div> */}

                            </div>

                        </div>
                    )
                })}
                {/* <div className='divRef' ref={bottomRef} /> */}
                <div className="row">
                    <div className="col">
                        <button onClick={() => SetChatMembers()} className='btn doneBtn'>Done</button>
                    </div>
                </div>

            </>
        )
    }

    return (
        <>
            <nav className='fixed-top shadow'>
                <HeaderNav
                    chatid={chatid}
                    setPage={setPage}
                    page={page}
                />
            </nav>
            <div className='container-fluid chatContainer'>
                <div id='chat' className='chatWindow d-flex align-items-end justify-content-center row'>
                    {page === 'chat' && <Messages />}
                    {page === 'add' && <Users />}
                </div>
                <div className='row inputContainer fixed-bottom'>
                    <div className="col d-flex justify-content-center m-2 pl-0">
                        <input
                            id='message'
                            placeholder='ChatR'
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