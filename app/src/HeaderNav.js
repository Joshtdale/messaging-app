import { React, useState  }from 'react'
import './HeaderNav.css'
import BackButton from './images/thenounproject.png'
import iButton from './images/i.png'
import xButton from './images/x.png'


function HeaderNav(props) {
    const [name, setName] = useState(props.page)
    const [value, setValue] = useState('')
    const renameInput = document.getElementById('renameInput')

    function handleKeyDown(event){
        if (event.key === 'Enter') {
            props.post('chat', value, props.page)
            // console.log(value)
            renameInput.value = ''
            setName('stuff')
            // console.log(messages)
        }
    };
    let chatObj = props.chatData.filter((item) => item.id === props.page)
    // console.log(chatObj[0].name)

    return (
        <div className='row headerNav'>
            <div className="col-3">
                <img onClick={() => props.setPage('Home')} className='backButton mx-4' src={BackButton} alt="back" />
            </div>
            <div className="col-6 text-center">
                {name !== 'rename' && <div>{chatObj[0].name}</div>}
                {name === 'rename' && <input id='renameInput' placeholder={chatObj[0].name} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />}
            </div>
            <div className="col-3 text-center">
                {name !== 'rename' && <img onClick={() => setName('rename')} className='backButton' src={iButton} alt="i" />}
                {name === 'rename' && <img onClick={() => setName('cancel')} className='backButton' src={xButton} alt="X" />}
            </div>
        </div>
    )
}

export default HeaderNav