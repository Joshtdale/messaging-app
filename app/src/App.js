import React from 'react'
import ChatWindow from './ChatWindow';
import HeaderNav from './HeaderNav';
import Home from './Home';
import { useState, useEffect } from 'react';
import axios from 'axios';

const APIUrl = 'https://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us77.gitpod.io/api/'
const user = 1

export default function App() {
    const [data, setData] = useState([]);
    const [chat, setChat] = useState([])
    const [page, setPage] = useState('Home')

    useEffect(() => {
        async function getData() {
            const response = await axios.get(APIUrl + 'messages/')
            const chatList = await axios.get(APIUrl + 'chats/')
            setData(response.data)
            setChat(chatList.data)
            // console.log(response.data)
            // console.log(chatList.data)
        }
        getData()
        // setInterval(getData, 1000)
    }, []);




    function postData(type, text, chat) {
        const time = new Date()
        var idTime = time.getTime()
        if (type === 'message') {
            axios.post(APIUrl + 'messages/', {

                "text": text,
                "user": {
                    "id": user
                },
                "chat": {
                    "id": chat
                },
                "timestamp": idTime
            })
        } else if (type === 'chat') {
            axios.put(APIUrl + 'chats/' + page + '/', {
                "name": text
            })
        } else if (type === 'create-chat'){
            axios.post(APIUrl + 'chats/', {
                "name": text
            })
        }
        }


    // const [filter, setFilter] = useState('')
    return (
        <>
            {page === 'Home' && 
            <Home 
            data={chat} 
            setPage={setPage} 
            post={postData} 
            />}

            {page !== 'Home' && 
            <nav className='fixed-top'>
            <HeaderNav 
            setPage={setPage} 
            page={page} 
            chatData={chat} 
            post={postData}/>
            </nav>}

            {page !== 'Home' && 
            <div className='mt-5 pt-5'> 
            <ChatWindow 
            data={data} 
            user={user} 
            post={postData} 
            page={page}/> 
            </div>}
        </>
    )
}
