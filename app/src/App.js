import React from 'react'
import ChatWindow from './ChatWindow';
import { useState, useEffect } from 'react';
import axios from 'axios';

const APIUrl = 'https://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us77.gitpod.io/api/Messages/'
const user = 1

export default function App() {

    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            const response = await axios.get(APIUrl)
            setData(response.data);
            // console.log(response.data);
        }
        getData()
    }, []);

    const [page, setPage] = useState('ChatWindow')
    return (
        <>
            {page === 'ChatWindow' && <ChatWindow data={data} user={user}/>}
        </>
    )
}
