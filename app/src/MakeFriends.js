import { React, useState } from 'react'
import { useGlobalState } from './context/GlobalState';
import request from './services/api.request';
import createButton from './images/create.png'
// import { useGlobalState } from './context/GlobalState'

function MakeFriends(props) {
    const [state, dispatch] = useGlobalState();

    async function sendFriendRequest(id) {
        let options = {
            method: 'post',
            url: 'friends/',
            data:{
            "user": {
                "id": state.currentUser.user_id
            },
            "requestedUser": {
                "id": id
            },
            "status": 0
            }
        }
        await request(options);
        props.getData()
    }

    let filteredUsers = state.users.filter((item) => item.id !== state.currentUser.user_id)
    // let relationship = state.friends.filter((item) =>
    // item.user.id === state.currentUser.user_id ||
    // item.requestedUser.id === state.currentUser.user_id)

    // let userFilter = filteredUsers.filter((item) => item.id !== )
    console.log(filteredUsers)
    let count = 0

    return (
        filteredUsers.map((item) => {
            count += 1

            return (
                <div key={count} className="row friendRow groupChats">
                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <img onClick={() => sendFriendRequest(item.id)} className='createBtn' src={createButton} alt="Add" />
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <div className='text-center btn text-light'>{item.first_name} - {item.username}</div>

                    </div>
                    {/* <div className="col-4 d-flex align-items-center justify-content-center">
                        {status === 'Pending...' && <img onClick={() => handleDecline(item.id)} className='backButton' src={xButton} alt='X' />}
                    </div> */}
                </div>
            )
        })
    )
}


export default MakeFriends