import React from 'react'
import './HeaderNav.css'
import BackButton from './images/thenounproject.png'

function HeaderNav(props) {
    return (
        <div className='row headerNav'>
            <div className="col">
                <img onClick={() => props.setPage('Home')} className='backButton' src={BackButton} alt="back" />
            </div>
        </div>
    )
}

export default HeaderNav