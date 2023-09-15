import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../../App.css';
import '../SignUp.css';

export default function SignUp() {
    function setFormMessage(formElement, type, message) {
        // selects the form message class,
        const messageElement = formElement.querySelector('.form__message');
        // this will determine the choices possible, success would be green and error would be red
        messageElement.textContent = message;
        messageElement.classList.remove('form__message--success', 'form__message--error');
        messageElement.classList.add(`form__message--${type}`)
    }

    function setInputError(inputElement, message) {
        inputElement.classList.add('form__input--error');
        inputElement.parentElement.querySelector('.form__input-error-message').textContent = message;
    }

    function clearInputError(inputElement) {
        inputElement.classList.remove('form__input--error');
        inputElement.parentElement.querySelector('.form__input-error-message').textContent = '';
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    useEffect(() => {
        const loginForm = document.querySelector('#login')
        const signupForm = document.querySelector('#createAccount');
        const createAccountLink = document.querySelector('#linkCreateAccount');
        const loginLink = document.querySelector('#linkLogin');

        const showSignupForm = () => {
            loginForm.classList.add('form--hidden');
            signupForm.classList.remove('form--hidden');
        }
        const showLoginForm = () => {
            loginForm.classList.remove('form--hidden');
            signupForm.classList.add('form--hidden');
        }

        createAccountLink.addEventListener('click', showSignupForm);
        loginLink.addEventListener('click', showLoginForm);

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // perform fetch login
            setFormMessage(loginForm, 'error', 'Invalid username/password combination');
        });


        document.querySelectorAll('.form__input').forEach(inputElement => {
            inputElement.addEventListener('blur', (e) => {
                if (e.target.id === 'signUpUsername') {
                    const username = e.target.value.trim(); // Remove leading/trailing whitespace so spaces aren't included
                    if ((username.length < 7 && username.length > 15) || !/^[A-Za-z0-9_-]+$/.test(username)) {
                        e.preventDefault();
                        setInputError(inputElement, 'Username must be at least seven but less than sixteen characters in length and can only contain alphanumeric characters, hyphens, or underscores.');
                    }
                }
                if (e.target.id === 'signUpEmail' && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e.target.value)) {
                    e.preventDefault();
                    setInputError(inputElement, 'Please enter a valid email address.');
                }
                if (e.target.id === 'signUpPassword') {
    const password = e.target.value.trim();
    if ((password.length < 7 || password.length > 30) || !/[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]+/.test(password)) {
        e.preventDefault();
        setInputError(inputElement, 'Please enter a password with a minimum of seven characters and a maximum of thirty characters that contains at least one special or number character');
    }
}

if (e.target.id === 'signUpConfirmPassword') {
    const confirmPassword = e.target.value.trim();
    const passwordField = document.querySelector('#signUpPassword');
    const password = passwordField.value.trim();

    if (confirmPassword !== password) {
        e.preventDefault();
        setInputError(inputElement, 'Passwords do not match.');
    }
}

                });
            inputElement.addEventListener('input', (e) => {
                clearInputError(inputElement);
            })
        })

        return () => {
            createAccountLink.removeEventListener('click', showSignupForm);
            loginLink.removeEventListener('click', showLoginForm);
            loginForm.removeEventListener('submit', showLoginForm);
        }


    }, [])
    /*
    document.addEventListener('DOMContentLoaded', () => {
        // saves what is associated with the id login and createAccount 
    
        document.querySelector('#linkCreateAccount').addEventListener('click', (e) => {
            // links to css that hides the login form by default 
            e.preventDefault();
            loginForm.classList.add('form--hidden');
            signupForm.classList.remove('form--hidden');
            // makes it so you can't scroll which prevents any issues with the page being displayed
            document.body.style.overflow = 'hidden';
        })
    
        document.querySelector('#linkLogin').addEventListener('click', (e) => {
            // if 'Click to login is clicked then it'll execute the following code which
            //   makes it so the login form is unhidden and the signup form is hidden 
                e.preventDefault();
                loginForm.classList.remove('form--hidden');
                signupForm.classList.add('form--hidden');
                // makes it so you can scroll
                document.body.style.overflow = 'auto';
        })
    }); 
    */

    return (
        /* signup-body is the body of the html page, 
            signup-container contains all of the login/sign-up form's content */
        <>
            <div className='signup-body'>
                <div className='signup-container'>
                    <form className='form' id='login'>
                        <h1 className="form__title">Login</h1>
                        <div className="form__message form__message--error"></div>
                        <div className="form__input-group">
                            <input type="text" autoFocus className="form__input" placeholder='Username or email' />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div className="form__input-group">
                            <input type="password" className="form__input" placeholder='Password' />
                            <div className="form__input-error-message"></div>
                        </div>
                        <button className="form__button" type='submit'>Continue</button>
                        <p className="form__text">
                            <Link to='./' className='form__link'>Forget your password? Don't worry we'll get you back on track!</Link>
                        </p>
                        <p className="form__text">
                            <Link to='./' id='linkCreateAccount' className='form__link'>Don't have an account? It's simple to create one</Link>
                        </p>
                    </form>


                    <form className='form form--hidden' id='createAccount'>
                        <h1 className="form__title">Create Account</h1>
                        <div className="form__message form__message--error"></div>
                        <div className="form__input-group">
                            <input type="text" id='signUpUsername' autoFocus className="form__input" placeholder='Username' />
                            <div className="form__input-error-message"></div>
                        </div>

                        <div className="form__input-group">
                            <input type="text" id='signUpEmail' className="form__input" placeholder='Email address' />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div className="form__input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='signUpPassword'
                                className="form__input"
                                placeholder='Password' />
                            <div className="form__input-error-message"></div>
                        </div>
                        <div className="form__input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='signUpConfirmPassword'
                                className="form__input"
                                placeholder='Confirm Password' />
                            <div className="form__input-error-message"></div>
                            <button type='button' className='toggle-password-button' onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide Password' : 'Show Password'}
                            </button>
                        </div>
                        <button className="form__button" type='submit' id='createAcc-continueButton'>Continue</button>
                        <p className="form__text">
                            <Link className='form__link' to='./' id='linkLogin'>Already have an account? Click to login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}