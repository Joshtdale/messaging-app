import React from 'react'
import './HomeNav.css'
import createButton from './images/create.png'
import profile from './images/profile.png'
import BackButton from './images/thenounproject.png'
import { useNavigate } from 'react-router-dom'



function HomeNav(props) {
    let navigate = useNavigate()
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
                    {props.page !== 'options' && <img onClick={() => props.postData('create-chat', 'New chat')} className='createBtn btn' src={createButton} alt='Create'></img>}
                    {props.page !== 'options' && <img onClick={() => navigate('/profile')} className='createBtn btn' src={profile} alt='Profile'></img>}
                </div>

            </div>
            )
}

            export default HomeNav