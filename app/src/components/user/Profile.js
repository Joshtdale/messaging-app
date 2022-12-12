import { React, useEffect } from "react"
import { useGlobalState } from "../../context/GlobalState";
import request from '/workspace/messaging-app/app/src/services/api.request'
import { useNavigate } from 'react-router-dom'
import ProfileNav from "./ProfileNav";
import profileImg from '/workspace/messaging-app/app/src/images/avatar.png'


const Profile = () => {
    const [state, dispatch] = useGlobalState();
    let navigate = useNavigate()

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

    function countSetter(){
        count = 0
    }

    function handleDblClick(){
        count += 1
        if (count === 2){
            console.log('dbl click')
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex justify-content-end mr-0 p-1">
                                <div title="Double click to edit" onClick={() => handleDblClick()}>{user.first_name}</div>
                            </div>
                            <div className="col d-flex justify-content-start ml-0 p-1">
                                <div title="Double click to edit" onClick={() => handleDblClick()}>{user.last_name}</div>
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