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
// import { GlobalProvider } from './context/GlobalState';
// import NavBar from './components/NavBar';
// import NavBar  from './componets'
import { Login, Profile, Register }  from './componets/user'

const APIUrl = 'https://8000-joshtdale-messagingappb-fkhldm7b4nl.ws-us78.gitpod.io/api/'
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
    const [friends, setFriends] = useState([])
    const [page, setPage] = useState('Home')

    useEffect(() => { // GET Axios call 📞
        async function getData() {
            // const response = await axios.get(APIUrl + 'messages/')
            // //Filter by user in url to return chats and messages - in the future
            // const chatList = await axios.get(APIUrl + 'chats/')
            // //Filter chats by user - in the future
            // const friendList = await axios.get(APIUrl + 'friends/')
            // setData(response.data)
            // setChat(chatList.data)
            // setFriends(friendList.data)
            // // console.log(response.data)
            // console.log(friendList.data)
        }
        getData()
        // setInterval(getData, 1000)
    }, []);

    useEffect(() => {
        console.log("connecting to pusher " + '1fb64f027f5f40e81a79');
		const pusher = new Pusher('1fb64f027f5f40e81a79', {
			cluster: 'us2'
		})
        
		const channel1 = pusher.subscribe('imclone_channel');
		// You can bind more channels here like this
		// const channel2 = pusher.subscribe('channel_name2')
		// channel1.bind(`chat_group_${props.page}`,function(data) {
        channel1.bind(`chat_group_1`,function(data) {
		    console.log(data)
		    // Code that runs when channel1 listens to a new message
            //props.addMessage(data);
		})

        console.log(channel1);
		
		return (() => {
			pusher.unsubscribe('imclone_channel')
			// pusher.unsubscribe('channel_name2')
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
    function addMessage(data){
        // todo: create an object out of data, append the obj to the messages in state
    }

    function postData(type, text, chat) {// Master CRUD function
        const time = new Date()
        var idTime = time.getTime()
        if (type === 'message') {// Message post
            axios.post(APIUrl + 'messages/', {
                "id": idTime,
                "text": text,
                "user": {
                    "id": user
                },
                "chat": {
                    "id": 1
                },
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
            {/* {page === 'Login' && */}
                <Login/>

            {/* {page === 'Home' &&
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
                        page={page}
                        addMessage={addMessage} />
                </div>} */}
        </>
    )
}