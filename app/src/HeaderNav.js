import { React, useState  }from 'react'
import './HeaderNav.css'
import BackButton from './images/thenounproject.png'
import iButton from './images/i.png'

function HeaderNav(props) {
    const [name, setName] = useState(props.page)
    const [value, setValue] = useState('')
    const renameInput = document.getElementById('renameInput')

    function handleKeyDown(event){
        if (event.key === 'Enter') {
            // props.post(value, props.page)
            console.log(value)
            renameInput.value = ''
            // console.log(messages)
        }
    };

    return (
        <div className='row headerNav'>
            <div className="col-3">
                <img onClick={() => props.setPage('Home')} className='backButton mx-4' src={BackButton} alt="back" />
            </div>
            <div className="col-6 text-center">
                {name !== 'rename' && <div>{props.page}</div>}
                {name === 'rename' && <input id='renameInput' placeholder={props.page} onKeyDown={(event) => handleKeyDown(event)} onChange={(e) => setValue(e.target.value)} />}
            </div>
            <div className="col-3 text-center">
                <img onClick={() => setName('rename')} className='backButton' src={iButton} alt="i" />
            </div>
        </div>
    )
}

export default HeaderNav