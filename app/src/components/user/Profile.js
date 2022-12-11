import { React, useEffect } from "react"
import { useGlobalState } from "../../context/GlobalState";
import request from '/workspace/messaging-app/app/src/services/api.request'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const [state, dispatch] = useGlobalState();
    let navigate = useNavigate()

    let user = ''

    async function getUser(){
        let userResp = await request({
            url: '/users/13/',
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

    if (state.userInfo){
        user = state.userInfo.data
    }

    function Logout(){
        localStorage.clear()
        console.log('You logged out!')
        navigate('/login')
    }
console.log(state.currentUserToken)
    return (
        <div>
            <h1>{state.currentUser.user_id}</h1>
            <h1>{user.username}</h1>
            <h1>{user.first_name}</h1>
            <h1>{user.last_name}</h1>
            <button onClick={Logout} className="btn btn-secondary">Logout</button>
        </div>
    )
}

export default Profile