import { React,useState } from 'react'
import './HomeNav.css'
import createButton from './images/create.png'
import profile from './images/profile.png'
import BackButton from './images/thenounproject.png'
import { useNavigate } from 'react-router-dom'
import addFriends from './images/addfriends.png'
import headLogo from './images/CHATR/NoBackground/Logo3.png'



function HomeNav(props) {
    // const [page, setPage] = useState('')

    let navigate = useNavigate()
    return (
        <div>
        <div className='row homeNavRow vw-100 d-flex justify-content-center align-items-center'>

            <div className="col-3 text-center">
            {props.page !== 'Options' && <button onClick={() => props.setPage('Options')} className='editButton btn'>Edit</button>}
                {props.page === 'Options' && <img onClick={() => props.setPage('Chats')} className='backButton' src={BackButton} alt="back" />}
                </div>

                <div className="col-6 p-0 text-center">
                    <img className='headerLogo' src={headLogo} alt="Logo" />
                </div>

                <div className="col-3 text-center createBtn">
                    <img onClick={() => props.postData('create-chat', 'New chat')} className='createChat btn' src={createButton} alt='Create'></img>
                    {props.page !== 'Options' && <img onClick={() => navigate('/profile')} className='profileNavBtn btn' src={profile} alt='Profile'></img>}
                </div>

            </div>
        <div className="row pageRow d-flex justify-content-center align-items-center">
            <div className="col-4 text-center">
                <button onClick={() => props.setPage('Friends')} className='btn homeNavBtn'>Friends</button>
                

            </div>
            <div className="col-4 text-center">
            <button onClick={() => props.setPage('Chats')} className='btn homeNavBtn'>Chats</button>
            </div>
            <div className="col-4 text-center">
                <img src={addFriends} onClick={() => props.setPage('Find Friends')} className=' homeNavBtn'/>
            </div>
        </div>
        </div>
            )
}

            export default HomeNav