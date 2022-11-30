import React from 'react'
import ChatWindow from './ChatWindow';
import HeaderNav from './HeaderNav';
import Home from './Home';
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
            setData(response.data)
            // console.log(response.data)

        }
        getData()
        // setInterval(getData, 1000)
    }, []);


    function postData(value) {
        const time = new Date()
        var idTime = time.getTime()
        axios.post(APIUrl, {

            "text": value,
            "user": {
                "id": user
            },
            "chat": {
                "id": 1
            },
            "timestamp": idTime
        })

    }


    // const [filter, setFilter] = useState('')
    const [page, setPage] = useState('Home')
    return (
        <>
            {page === 'Home' && <Home data={data} setPage={setPage} />}
            {page !== 'Home' && <nav className='fixed-top'>
                <HeaderNav setPage={setPage} />
            </nav>}
            {page !== 'Home' && <div className='mt-5 pt-5'> <ChatWindow data={data} user={user} post={postData} page={page} /> </div>}
        </>
    )
}
