import { React,useState } from 'react'
import './HomeNav.css'
import createButton from './images/create.png'
import profile from './images/profile.png'
import BackButton from './images/thenounproject.png'
import { useNavigate } from 'react-router-dom'



function HomeNav(props) {
    const [page, setPage] = useState('')
    let navigate = useNavigate()
    return (
        <>
        <div className='row homeNavRow vw-100 shadow d-flex justify-content-center align-items-center'>

            <div className="col-4 text-center">
            {props.page !== 'options' && <button onClick={() => props.setPage('options')} className='editButton btn'>Edit</button>}
                {props.page === 'options' && <img onClick={() => props.setPage('Home')} className='backButton' src={BackButton} alt="back" />}
                </div>

                <div className="col-4 text-center">
                    Messages
                </div>

                <div className="col-4 text-center createBtn">
                    {props.page !== 'options' && <img onClick={() => props.postData('create-chat', 'New chat')} className='createBtn btn' src={createButton} alt='Create'></img>}
                    {props.page !== 'options' && <img onClick={() => navigate('/profile')} className='profileNavBtn btn' src={profile} alt='Profile'></img>}
                </div>

            </div>
        <div className="row">
            <div className="col">
                {/* <button onClick={() => } className='btn homeNavBtn'>Friends</button> */}
            </div>
            <div className="col">
                <button className='btn homeNavBtn'>Find</button>
            </div>
        </div>
        </>
            )
}

            export default HomeNav