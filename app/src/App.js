import React from 'react'
import ChatWindow from './ChatWindow';
import HeaderNav from './HeaderNav';
import Home from './Home';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import pusher from 'pusher-js';
// import pusher from 'pusher'
import Pusher from 'pusher-js';
// import { Outlet } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
// import NavBar from './components/NavBar';
// import NavBar  from './componets'
// import { Login, Profile, Register }  from './componets/user'
import request from './services/api.request'
import NavBar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGlobalState } from "./context/GlobalState";
import Profile from './components/user/Profile';

// const APIUrl = 'https://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us78.gitpod.io/api/'




let user = ''



export default function App() {
    // const [loggedin, setLoggedin] = useState()
    const [state, dispatch] = useGlobalState();
    let navigate = useNavigate()
    
    if (!state.currentUser) {
        navigate('/login')
    } else {
        navigate('/msgs')
    }
    // console.log(user)


    // const [chat, setChat] = useState([])
    const [friends, setFriends] = useState([])





    // // useEffect(() => {
    //     const channel = pusher.subscribe('chat-channel');
    //     channel.bind('new-message', function (data) {
    //         console.log('message sent')
    //         console.log(data)
    //         // assuming the chat_id is stored in state
    //         // if (data.chat == chat_id) {
    //             // if (data.user.id == user) {
    //                 // post message from current user (me) (right justified)
    //             // } else {
    //                 // post message from other user in the chat room (them) (left justified)
    //             // }
    //         // }

    //     })
    // // }, []);


 
    // console.log(page)
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}