import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import './User.css'
import logo from '/workspace/messaging-app/app/src/images/CHATR/NoBackground/'

const Login = () => {
    let navigate = useNavigate();

    const [state, dispatch] = useGlobalState();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        AuthService
            .login(username, password)
            .then(async (resp) => {
                let data = jwtDecode(resp.access)
                await dispatch({
                    currentUserToken: resp.access,
                    currentUser: data
                })
                navigate('/msgs')
            });
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="row text-center">
                <div className="col">
                    <div className="c-form">
                        <form onSubmit={handleLogin}>
                            <div>
                                {/* <label htmlFor="username">Username: </label> */}
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    className="userInput"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="pass">Password: </label> */}
                                <input
                                    type="password"
                                    id="pass"
                                    name="password"
                                    minLength="8"
                                    placeholder="Password"
                                    className="userInput"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className="btn signInBtn"
                            >Sign in</button>
                            <button onClick={() => navigate('/register')} className='btn signInBtn'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login