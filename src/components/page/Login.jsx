import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../App.css';
import '../SignUp.css';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    function setFormMessage(formElement, type, message) {
        const messageElement = formElement.querySelector('.form__message');
        messageElement.textContent = message;
        messageElement.classList.remove('form__message--success', 'form__message--error');
        messageElement.classList.add(`form__message--${type}`);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        // Select the values from the login form
        const usernameOrEmail = document.querySelector('#loginUsernameOrEmail').value;
        const password = document.querySelector('#loginPassword').value;

        // Make a POST request for login
        try {
            const response = await axios.post('http://localhost:3000/login', {
                usernameOrEmail,
                password
            });
            if (response.status === 200) {
                // Login successful, you can redirect or set user state here
            } else {
                setLoginError('Invalid username/email or password.');
            }
        } catch (error) {
            setLoginError('An error occurred. Please try again later.');
        }
    }

    useEffect(() => {
        const loginForm = document.querySelector('#login');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            setFormMessage(loginForm, 'error', 'Invalid username/email or password.');
        });
    }, []);

    return (
        <>
            <div className="signup-body">
                <div className="signup-container">
                    <form className='form' id='login'>
                        <h1 className="form__title">Login</h1>
                        {loginError && (
                            <p className="error-message">{loginError}</p>
                        )}
                        <div className="form__message form__message--error"></div>
                        <div className="form__input-group">
                            <input type="text" autoFocus className="form__input" placeholder='Username or email' id="loginUsernameOrEmail" />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div className="form__input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form__input"
                                placeholder='Password'
                                id="loginPassword" />
                            <div className="form__input-error-message"></div>
                        </div>
                        <button type='button' className='toggle-password-button' onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </button>
                        <button className="form__button" type='submit' id='signIn--continueButton' onClick={handleLogin}>Continue</button>
                        <p className="form__text">
                            <Link to='./' className='form__link'>Forgot your password? Don't worry we'll get you back on track!</Link>
                        </p>
                        <p className="form__text">
                            <Link to='/sign-up' id='linkCreateAccount' className='form__link'>Don't have an account? It's simple to create one</Link>
                        </p>
                    </form>
                </div>
            </div >
        </>
    )
}
