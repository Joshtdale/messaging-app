import React from 'react'
import HomeNav from './HomeNav'
import './Home.css'

let count = 0
let chats = [
    {
        name: 'group 1'
    },
    {
        name: 'group 2'
    },
    {
        name: 'group 3'
    },
    {
        name: 'group 4'
    }
]

function Home(props) {
    let chats = props.data
    let uniqueChats = chats.map(item => item.chat.name).filter((value, index, self) => self.indexOf(value) === index)
    console.log(uniqueChats)
    


    return (
        <div className='container-fluid'>
            <div className="row justify-content-center">
                <div className="col">
                    <HomeNav />
                </div>
                {uniqueChats.map((item) => {
                    count += 1
                    return (
                        <div key={count} className="row">
                            <div onClick={() => props.setPage(item)} className="col d-flex align-items-center justify-content-center groupChats">
                                <div className='text-center'>{item}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Home