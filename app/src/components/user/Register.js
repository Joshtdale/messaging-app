import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import logo from '../../images/CHATR/NoBackground/Logobubblebackground.png'

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        passwordConf: "",
        firstName: "",
        lastName: "",
        email: "",
    })

    const handleChange = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        AuthService.register(user)
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-12">
                            <img className="loginLogo" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <div className="c-form">
                                <form onSubmit={handleRegister}>
                                    <div>
                                        {/* <label htmlFor="username">Username:</label> */}
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            className="userInput"
                                            onChange={(e) => handleChange('username', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="email">Email:</label> */}
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            className="userInput"
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="pass">Password (8 characters minimum):</label> */}
                                        <input
                                            type="password"
                                            id="pass"
                                            name="password"
                                            placeholder="Password"
                                            className="userInput"
                                            minLength="8"
                                            required
                                            onChange={(e) => handleChange('password', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="passConf">Confirm Password:</label> */}
                                        <input
                                            type="password"
                                            id="passConf"
                                            name="password"
                                            placeholder="Confirm Password"
                                            className="userInput"
                                            minLength="8"
                                            required
                                            onChange={(e) => handleChange('passwordConf', e.target.value)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="firstName">First Name:</label> */}
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="fname"
                                            placeholder="First Name"
                                            className="userInput"

                                            required
                                            onChange={(e) => handleChange('firstName', e.target.value)} />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="lastName">Last Name:</label> */}
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lname"
                                            placeholder="Last Name"
                                            className="userInput"
                                            required
                                            onChange={(e) => handleChange('lastName', e.target.value)} />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Register"
                                        className="signInBtn"
                                        disabled={(
                                            user.password &&
                                            user.password.length >= 8 &&
                                            user.password === user.passwordConf &&
                                            user.firstName &&
                                            user.lastName &&
                                            user.email
                                        ) ? false : true}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )

}

export default Register