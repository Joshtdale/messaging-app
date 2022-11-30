import React from 'react'
import './HomeNav.css'
import createButton from './images/create.png'


function HomeNav() {
    return (
        <div className='row vw-100'>
            <div className="col text-center mt-1">
                <button className='editButton btn'>Edit</button>
            </div>
            <div className="col text-center mt-2">
                Messages
            </div>
            <div className="col text-center createBtn">
                <img className='createBtn btn' src={createButton} alt='Create'></img>
            </div>
        </div>
    )
}

export default HomeNav