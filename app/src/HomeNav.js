import React from 'react'
import './HomeNav.css'
import createButton from './images/create.png'


function HomeNav() {
    return (
        <div className='row vw-100'>
            <div className="col text-center mt-1">
                <button className='editButton btn'>Edit</button>
                {/* <div className="dropdown mb-3">
                    <div
                        className="btn btn-secondary dropdown-toggle"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Select Location
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button className="dropdown-item">
                            Main St
                        </button>
                        <button className="dropdown-item">
                            S. Broadway
                        </button>
                    </div>
                </div> */}
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