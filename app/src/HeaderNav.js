import { React, useState  }from 'react'
import './HeaderNav.css'
import BackButton from './images/thenounproject.png'
import iButton from './images/i.png'
import xButton from './images/x.png'
import request from './services/api.request'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from './context/GlobalState'


function HeaderNav(props) {
    const [name, setName] = useState(props.page)
    const [value, setValue] = useState('')
    const renameInput = document.getElementById('renameInput')

    let navigate = useNavigate()
    const [state, dispatch] = useGlobalState()


    let chatObj = state.chats.find((item) => item.id == props.chatid)
    console.log(chatObj)

    async function handleKeyDown(event){
        if (event.key === 'Enter') {
            let options = {
                method: 'PUT',
                url: 'chats/' + props.chatid + '/',
                data: {
                    "name": value
                }
            }
            // console.log(options)
            await request(options);
            // console.log(value)
            renameInput.value = ''
            setName('stuff')
            // console.log(messages)
        }
    };

    return (
        <div className='row headerNav'>
            <div className="col-3">
                <img onClick={() => navigate('/msgs')} className='backButton mx-4' src={BackButton} alt="back" />
            </div>
            <div className="col-6 text-center">
                {name !== 'rename' && <div onDoubleClick={() => setName('rename')}>{chatObj?.name}</div>}
                {name === 'rename' && <input id='renameInput' placeholder={chatObj?.name} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />}
            </div>
            <div className="col-3 text-center">
                {name !== 'rename' && <img onClick={() => setName('rename')} className='backButton' src={iButton} alt="i" />}
                {name === 'rename' && <img onClick={() => setName('cancel')} className='backButton' src={xButton} alt="X" />}
            </div>
        </div>
    )
}

export default HeaderNav