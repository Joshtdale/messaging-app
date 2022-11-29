import React from 'react'
import ChatWindow from './ChatWindow';
import HeaderNav from './HeaderNav';
import { useState, useEffect } from 'react';
import axios from 'axios';

const APIUrl = 'https://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us77.gitpod.io/api/messages/'
const user = 1

export default function App() {

    const [data, setData] = useState([]);
    // function Data(){
        useEffect(() => {
            async function getData() {
                const response = await axios.get(APIUrl)
                // setInterval(
                    setData(response.data),
                    console.log(response.data)
                    
                    // , 1000)
            }
            getData()
            // setInterval(getData, 1000)
        }, []);
    // }
// setInterval(Data(), 1000)

        function postData(value) {
            axios.post(APIUrl, {
                
                    "text": value,
                    "user": user
            })

        }


    const [page, setPage] = useState('ChatWindow')
    return (
        <>
            <HeaderNav />
            {page === 'ChatWindow' && <ChatWindow data={data} user={user} post={postData}/>}
        </>
    )
}
