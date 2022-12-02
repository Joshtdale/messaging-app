import React from 'react'
import { useState } from 'react'
import HomeNav from './HomeNav'
import './Home.css'
import xButton from './images/x.png'

let count = 0


function Home(props) {
    let chats = props.data
    // let uniqueChats = chats.map(item => item.chat.name).filter((value, index, self) => self.indexOf(value) === index)
    // console.log(uniqueChats)
    const [page, setPage] = useState('')
    const [value, setValue] = useState('')
    const input = document.getElementById('input')

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            // props.post(value)
            console.log(value)
            input.value = ''
            // console.log(messages)
        }
    };


    return (
        <div className='container-fluid'>
            <div className="row justify-content-center">
                <div className="col">
                    <HomeNav setPage={setPage} page={page} post={props.post} />
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <input id='input' placeholder='Search' className='searchBox' onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />
                    </div>
                </div>
                {chats.map((item) => {
                    count += 1
                    return (
                        <div key={count} className="row">
                            <div className="col d-flex align-items-center justify-content-center groupChats">
                                {/* <div className="row"> */}
                                    {/* <div className="col-2"> */}
                                    {/* </div> */}
                                    {/* <div className="col-8"> */}
                                        <div onClick={() => props.setPage(item.id)} className='text-center btn text-light'>{item.name}</div>
                                    {/* </div> */}
                                    {/* <div className="col-2"> */}
                                        {page === 'options' && <img onClick={() => props.post('delete','', item.id)} className='btn chatDelete' src={xButton} alt="X" />}
                                    {/* </div> */}
                                {/* </div> */}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Home