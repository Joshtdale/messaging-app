import React from 'react'
import { useGlobalState } from './context/GlobalState'
import xButton from './images/x.png'
import request from './services/api.request'


function Friends(props) {


    async function handleAccept(id) {
        console.log('accepted', id)
        let options = {
            method: 'PUT',
            url: 'friends/' + id + '/',
            data: {
                "status": 1
            }
        }
        // console.log(options)
        await request(options);
        props.getData()
    }

    async function handleDecline(id) {
        console.log('declined', id)
        let options = {
            method: 'PUT',
            url: 'friends/' + id + '/',
            data: {
                "status": 2
            }
        }
        // console.log(options)
        await request(options);
        props.getData()
    }


    let count = 0
    const [state, dispatch] = useGlobalState();
    // console.log(state.currentUser.friends)
    let relationship = state.friends.filter((item) =>
        item.user.id === state.currentUser.user_id ||
        item.requestedUser.id === state.currentUser.user_id)
    // console.log(relationship)
    return (
        relationship.map((item) => {
            let friend = {}
            let status = ''
            // console.log(item.id)
            if (state.currentUser.user_id === item.requestedUser.id || state.currentUser.user_id === item.user.id) {
                if (item.user !== state.currentUser.user_id) {

                    friend = item.user
                    if (item.status == 0) {
                        status = 'Pending...'
                    } else if (item.status == 2) {
                        status = 'Declined'
                    } else {
                        status = 'Accepted'
                    }

                } else if (item.requestedUser.id !== state.currentUser.user_id) {

                    friend = item.requestedUser

                    if (item.status == 0) {
                        status = 'Pending...'
                    } else if (item.status == 2) {
                        status = 'Declined'
                    }
                }
            }

            count += 1

            return (
                <div key={count} className="row friendRow">
                    <div className="col-4 d-flex align-items-center justify-content-center">
                        {status === 'Pending...' && <input onClick={() => handleAccept(item.id)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />}
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-center groupChats">
                        <div className='text-center btn text-light'>{friend.name} - {friend.username}</div>
                        {status === 'Pending...' &&
                            <div>{status}</div>
                        }

                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-center">
                        {status === 'Pending...' && <img onClick={() => handleDecline(item.id)} className='backButton' src={xButton} alt='X' />}
                    </div>
                </div>
            )

        })
    )
}

export default Friends