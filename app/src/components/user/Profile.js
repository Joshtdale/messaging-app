import { React, useEffect, useState } from "react"
import { useGlobalState } from "../../context/GlobalState";
import request from '/workspace/messaging-app/app/src/services/api.request'
import { useNavigate } from 'react-router-dom'
import ProfileNav from "./ProfileNav";
import profileImg from '/workspace/messaging-app/app/src/images/avatar.png'


const Profile = () => {
    const [state, dispatch] = useGlobalState();
    const [page, setPage] = useState('')
    // const [inputText, setInputText] = useState('')
    const [value, setValue] = useState('')
    // let navigate = useNavigate()

    let user = ''
    let count = 0

    async function getUser() {
        let userResp = await request({
            url: `/users/${state.currentUser.user_id}/`,
            method: 'GET',
        })
        dispatch({
            ...state,
            userInfo: userResp
        })
    }

    useEffect(() => {
        getUser()
        // console.log('triggered get user')
    }, [])
    // console.log(state.userInfo)

    if (state.userInfo) {
        user = state.userInfo.data
    }

    function countSetter() {
        count = 0
    }

    async function handleKeyDown(event){
        if (event.key === 'Enter') {
            // let options = {
            //     method: 'PUT',
            //     url: 'chats/' + props.chatid + '/',
            //     data: {
            //         "name": value
            //     }
            // }
            // // console.log(options)
            // await request(options);
            // // console.log(value)
            // renameInput.value = ''
            // setName('stuff')
            // props.getData()
            // // console.log(messages)
        }
    };

    function handleDblClick(setState) {
        count += 1
        if (count === 2) {
            console.log('dbl click')
            setPage(setState)

            count = 0
        }
        setTimeout(countSetter, 200)
        // console.log(event.detail);
        // switch (event.detail) {
        //     case 1: {
        //         console.log('single click');
        //         break;
        //     }
        //     case 2: {
        //         console.log('double click');
        //         break;
        //     }
        //     case 3: {
        //         console.log('triple click');
        //         break;
        //     }
        //     default: {
        //         break;
        //     }
        // }
    };


    return (
        <>
            <div className="row">
                <div className="col d-flex align-items-center justify-content-center">
                    <ProfileNav />
                </div>
            </div>

            <div className="container vh-100 d-flex justify-content-center">
                <div className="row text-center">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <img className="rounded-circle profileImg" src={profileImg} alt="Profile Image" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h3>{user.username}</h3>
                                <div>Number: {user.id}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex justify-content-end mr-0 p-1">
                                {page !== 'EditFirstName' && <div title="Double click to edit" onClick={() => handleDblClick('EditFirstName')}>{user.first_name}</div>}
                                {page === 'EditFirstName' && <input className="nameInput" placeholder={user.first_name} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />}
                            </div>
                            <div className="col d-flex justify-content-start ml-0 p-1">
                                {page !== 'EditLastName' && <div title="Double click to edit" onClick={() => handleDblClick('EditLastName')}>{user.last_name}</div>}
                                {page === 'EditLastName' && <input className='nameInput' placeholder={user.last_name} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />}
                            </div>
                        </div>
                        {/* <div>{user.last_name}</div> */}
                        {/* <button onClick={Logout} className="btn btn-secondary">Logout</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile