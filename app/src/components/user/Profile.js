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

    function Logout() {
        localStorage.clear()
        console.log('You logged out!')
        navigate('/login')
    }
    return (
        <>
            <ProfileNav />
            <div className="container vh-100 d-flex justify-content-center">
                <div className="row text-center">
                    <div className="col">
                        <div>
                            <img className="rounded-circle profileImg" src={profileImg} alt="Profile Image" />
                            <h3>{user.username}</h3>
                            <div>{user.first_name} {user.last_name}</div>
                            {/* <div>{user.last_name}</div> */}
                            <button onClick={Logout} className="btn btn-secondary">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile