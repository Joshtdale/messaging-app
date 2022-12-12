import React from 'react'
// import createButton from '/workspace/messaging-app/app/src/images/create.png'
// import profile from './images/profile.png'
import BackButton from '/workspace/messaging-app/app/src/images/thenounproject.png'
import { useNavigate } from 'react-router-dom'


function ProfileNav() {
    function Logout() {
        localStorage.clear()
        console.log('You logged out!')
        navigate('/login')
    }

    let navigate = useNavigate()
    return (
        <div className='row homeNavRow vw-100'>

            <div className="col text-center mt-1">
                {/* {props.page !== 'options' && <button onClick={() => props.setPage('options')} className='editButton btn'>Edit</button>} */}
                <img onClick={() => navigate('/msgs')} className='backButton' src={BackButton} alt="back" />
            </div>

            <div className="col text-center mt-2">
                Profile
            </div>

            <div className="col text-center createBtn">
                {/* {props.page !== 'options' && <img onClick={() => props.postData('create-chat', 'New chat')} className='createBtn btn' src={createButton} alt='Create'></img>} */}
                {/* {props.page !== 'options' && <img onClick={() => navigate('/profile')} className='createBtn btn' src={profile} alt='Profile'></img>} */}
                <button onClick={Logout} className="btn btn-secondary m-2 signInBtn">Logout</button>
            </div>

        </div>
    )
}

export default ProfileNav