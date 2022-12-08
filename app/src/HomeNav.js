import React from 'react'
import './HomeNav.css'
import createButton from './images/create.png'
import addFriends from './images/addFriends.png'
import BackButton from './images/thenounproject.png'


function HomeNav(props) {
    return (
        <div className='row homeNavRow vw-100'>

            <div className="col text-center mt-1">
            {props.page !== 'options' && <button onClick={() => props.setPage('options')} className='editButton btn'>Edit</button>}
                {props.page === 'options' && <img onClick={() => props.setPage('Home')} className='backButton' src={BackButton} alt="back" />}
                </div>

                <div className="col text-center mt-2">
                    Messages
                </div>

                <div className="col text-center createBtn">
                    {props.page !== 'options' && <img onClick={() => props.post('create-chat', 'New chat')} className='createBtn btn' src={createButton} alt='Create'></img>}
                    {props.page !== 'options' && <img onClick={() => props.post('create-chat', 'New chat')} className='createBtn btn' src={addFriends} alt='Add friends'></img>}
                </div>

            </div>
            )
}

            export default HomeNav