import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";

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
                navigate('/profile')
            });
    }

    return (
        <div className="c-form">
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pass">Password</label>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        minLength="8"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="Sign in"
                />
            </form>
        </div>
    )

}

export default Login