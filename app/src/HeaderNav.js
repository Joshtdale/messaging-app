import { React, useState  }from 'react'
import './HeaderNav.css'
import BackButton from './images/thenounproject.png'
import iButton from './images/i.png'
import xButton from './images/x.png'
import request from './services/api.request'
import createButton from './images/create.png'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from './context/GlobalState'


function HeaderNav(props) {
    const [name, setName] = useState(props.page)
    const [value, setValue] = useState('')
    const renameInput = document.getElementById('renameInput')

    let navigate = useNavigate()
    const [state, dispatch] = useGlobalState()

    let count = 0


    let chatObj = state.chats.find((item) => item.id == props.chatid)
    // console.log(chatObj)

    async function handleKeyDown(event){
        if (event.key === 'Enter') {
            let options = {
                method: 'PUT',
                url: 'groups/' + props.chatid + '/',
                data: {
                    "name": value
                }
            }
            // console.log(options)
            await request(options);
            // console.log(value)
            renameInput.value = ''
            setName('stuff')
            // props.getData()
            // console.log(messages)
        }
    };

    function countSetter(){
        count = 0
    }

    function handleDblClick(){
        count += 1
        if (count === 2){
            setName('rename')
            count = 0
        }
        setTimeout(countSetter, 200)
    };

    // console.log(chatObj)
    // function addUsers(){

    // }

    return (
        <div className='row headerNav d-flex justify-content-center align-items-center'>
            <div className="col-4">
                <img onClick={() => navigate('/msgs')} className='backButton mx-4' src={BackButton} alt="back" />
            </div>
            <div className="col-4 text-center">
                {name !== 'rename' && <div onClick={handleDblClick}>{chatObj?.name}</div>}
                {name === 'rename' && <input id='renameInput' placeholder={chatObj?.name} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />}
            </div>
            <div className="col-4 text-center">
                {name !== 'rename' && <img onClick={() => setName('rename')} className='backButton' src={iButton} alt="i" />}
                {name === 'rename' && <img onClick={() => setName('cancel')} className='backButton' src={xButton} alt="X" />}
                {props.page !== 'add' && <img onClick={() => props.setPage('add')} className='addUser' src={createButton} alt="Add" />}
                {props.page === 'add' && <img onClick={() => props.setPage('chat')} className='backButton' src={xButton} alt="Add" />}
            </div>
        </div>
    )
}

export default HeaderNav