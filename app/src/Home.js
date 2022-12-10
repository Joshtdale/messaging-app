import React from 'react'
import { useState, useEffect } from 'react'
import HomeNav from './HomeNav'
import './Home.css'
import xButton from './images/x.png'
import ChatWindow from './ChatWindow';
import Pusher from 'pusher-js';
import request from './services/api.request'
import Profile from './components/user/Profile';
import HeaderNav from './HeaderNav'
import { useGlobalState } from './context/GlobalState'
import { useNavigate } from 'react-router-dom'

let count = 0


function Home() {
    // let uniqueChats = chats.map(item => item.chat.name).filter((value, index, self) => self.indexOf(value) === index)
    // console.log(uniqueChats)
    let navigate = useNavigate()
    const [page, setPage] = useState('')
    const [state, dispatch] = useGlobalState();
    const [value, setValue] = useState('')
    const input = document.getElementById('input')

    useEffect(() => { // GET Axios call 📞
        if (!state.currentUser) {
            navigate('/login')
        }
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
            let msgResp = await request({
                url: '/messages',
                method: 'GET',
            })

            let chatResp = await request({
                url: '/chats',
                method: 'GET',
            })

            dispatch({
                ...state,
                chats: chatResp.data,
                messages: msgResp.data,
            })
        }
        getData()
        // setInterval(getData, 1000)

        console.log("connecting to pusher " + '1fb64f027f5f40e81a79');
        const pusher = new Pusher('1fb64f027f5f40e81a79', {
            cluster: 'us2'
        })

        const channel1 = pusher.subscribe('imclone_channel');
        // You can bind more channels here like this
        // const channel2 = pusher.subscribe('channel_name2')
        // channel1.bind(`chat_group_${props.page}`,function(data) {
        channel1.bind(`chat_group_${page}`, function (data) {
            console.log(data)
            // Code that runs when channel1 listens to a new message
            //props.addMessage(data);
        })

        console.log(channel1);

        return (() => {
            pusher.unsubscribe('imclone_channel')
            // pusher.unsubscribe('channel_name2')
        })

    }, []);


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            // props.post(value)
            console.log(value)
            input.value = ''
            // console.log(messages)
        }
    };

    async function postData(type, text, chat) {// Master CRUD function
        if (type === 'create-chat') {// Chat create/post
            // axios.post(APIUrl + 'chats/', {
            //     "name": text
            // })
            let options = {
                method: 'POST',
                url: 'chats/',
                data: {
                    "name": text
                }
            }
            // console.log(options)
            let resp = await request(options);
            dispatch({
                ...state,
                chats: [
                    ...chat,
                    resp.data
                ]
            })

        } else if (type === 'delete') {// Chat Delete 🧨🧨
            // axios.delete(APIUrl + 'chats/' + chat)
            let options = {
                method: 'DELETE',
                url: 'chats/' + chat,

            }
            // console.log(options)
            let resp = await request(options);
            dispatch({
                ...state,
                chats: [ state.chats.filter(c => c.id != chat) ]
            })
        }
    }

    return (
        <>
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="col">
                        <HomeNav setPage={setPage} page={page} post={postData} />
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <input id='input' placeholder='Search' className='searchBox' onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />
                        </div>
                    </div>
                    {state.chats.map((item) => {
                        count += 1
                        return (
                            <div key={count} className="row">
                                <div className="col d-flex align-items-center justify-content-center groupChats">
                                    {/* <div className="row"> */}
                                    {/* <div className="col-2"> */}
                                    {/* </div> */}
                                    {/* <div className="col-8"> */}
                                    <div onClick={() => navigate(`/msgs/${item.id}`)} className='text-center btn text-light'>{item.name}</div>
                                    {/* </div> */}
                                    {/* <div className="col-2"> */}
                                    {page === 'options' && <img onClick={() => postData('delete', '', item.id)} className='btn chatDelete' src={xButton} alt="X" />}
                                    {/* </div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Home