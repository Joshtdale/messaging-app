import { React, useState } from 'react'
import { useGlobalState } from './context/GlobalState';
import request from './services/api.request';
// import { useGlobalState } from './context/GlobalState'

function MakeFriends() {
    const [state, dispatch] = useGlobalState();

    let filteredUsers = state.users.filter((item) => item.id !== state.currentUser.user_id)
    // console.log(filteredUsers)

    return (
        <div>MakeFriends</div>
    )
}

export default MakeFriends