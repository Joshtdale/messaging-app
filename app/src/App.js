import React from 'react'
import ChatWindow from './ChatWindow';
import HeaderNav from './HeaderNav';
import Home from './Home';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import React, { Component } from 'react';
// import axios from 'axios';
// import Pusher from 'pusher-js';
// import ChatList from './ChatList';
// import ChatBox from './ChatBox';
// import logo from './logo.svg';
// import './App.css';

const APIUrl = 'https://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us77.gitpod.io/api/'
const user = 1




// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             text: '',
//             username: '',
//             chats: []
//         };
//     }

//     componentDidMount() {
//         const username = window.prompt('Username: ', 'Anonymous');
//         this.setState({ username });
//         const pusher = new Pusher('1fb64f027f5f40e81a79', {
//             cluster: 'us2',
//             encrypted: true
//         });
//         const channel = pusher.subscribe('chat');
//         channel.bind('message', data => {
//             this.setState({ chats: [...this.state.chats, data], test: '' });
//         });
//         this.handleTextChange = this.handleTextChange.bind(this);
//     }

//     handleTextChange(e) {
//         if (e.keyCode === 13) {
//             // const payload = {
//             // username: this.state.username,
//             // "text": this.state.text,
//             // "user": {
//             //     "id": user
//             // }
//             // "text": text,
//             //                 "user": {
//             //                     "id": user
//             //                 },
//             //                 "chat": {
//             //                     "id": chat
//             //                 },
//             //                 "timestamp": idTime
//             // };
//             console.log(this.state.text, user)
//             let text = this.state.text
//             axios.post(APIUrl + 'messages/', {

//                 "text": text,
//                 "user": {
//                     "id": user
//                 },
//                 "chat": {
//                     "id": 1
//                 }
//                 // "timestamp": idTime
//             })
//         } else {
//             this.setState({ text: e.target.value });
//         }
//     }

//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <img src={logo} className="App-logo" alt="logo" />
//                     <h1 className="App-title">Welcome to React-Pusher Chat</h1>
//                 </header>
//                 <section>
//                     <ChatList chats={this.state.chats} />
//                     <ChatBox
//                         text={this.state.text}
//                         username={this.state.username}
//                         handleTextChange={this.handleTextChange}
//                     />
//                 </section>
//             </div>
//         );
//     }
// }

// export default App;

// export default App() {
//     data() {
//         return {
//             username: 'username',
//             message: '',
//             messages: []
//         }
//     },
//     mounted() {
//         Pusher.logToConsole = true;
//         const pusher = new Pusher('', {
//             cluster: ''
//         });
//         const channel = pusher.subscribe('chat');
//         channel.bind('message', data => {
//             this.messages.push(data);
//         });
//     },
//     methods: {
//         async submit() {
//             await this.$axios.post('http://localhost:8000/api/messages', {
//                 username: this.username,
//                 message: this.message
//             });
//             this.message = '';
//         }
//     }
// }


export default function App() {
    const [data, setData] = useState([]);
    const [chat, setChat] = useState([])
    const [page, setPage] = useState('Home')

    useEffect(() => { // GET Axios call 📞
        async function getData() {
            const response = await axios.get(APIUrl + 'messages/')
            //Filter by user in url to return chats and messages - in the future
            const chatList = await axios.get(APIUrl + 'chats/')
            //Filter chats by user - in the future
            setData(response.data)
            setChat(chatList.data)
            // console.log(response.data)
            // console.log(chatList.data)
        }
        getData()
        setInterval(getData, 1000)

        // const socket = new WebSocket('wss://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us77.gitpod.io/api/messages/ws/socket-server');
        // socket.addEventListener('open', (event) => {
        //     socket.send('Hello Server!');
        // });
        // socket.addEventListener('message', (event) => {
        //     console.log('Message from server ', event.data);
        // });
        
 

    }, []);




    function postData(type, text, chat) {// Master CRUD function
        const time = new Date()
        var idTime = time.getTime()
        if (type === 'message') {// Message post
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
        } else if (type === 'chat') {// Chat update/put name
            axios.put(APIUrl + 'chats/' + page + '/', {
                "name": text
            })
        } else if (type === 'create-chat') {// Chat create/post
            axios.post(APIUrl + 'chats/', {
                "name": text
            })
        } else if (type === 'delete') {// Chat Delete 🧨🧨
            axios.delete(APIUrl + 'chats/' + chat)
        }
    }

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
                        post={postData} />
                </nav>}

            {page !== 'Home' &&
                <div className='mt-5 pt-5'>
                    <ChatWindow
                        data={data}
                        user={user}
                        post={postData}
                        page={page} />
                </div>}
        </>
    )
}