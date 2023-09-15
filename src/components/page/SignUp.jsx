import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn"; // Import the zxcvbn library
import '../../App.css';
import '../SignUp.css';

export default function SignUp() {
    function setFormMessage(formElement, type, message) {
        const messageElement = formElement.querySelector('.form__message');
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

    const [passwordStrength, setPasswordStrength] = useState(0);

    // // displays the password strength as a string rather than numbers '0, 1, 2, 3, 4' to help people understand
    function getPasswordStrengthText() {
        switch (passwordStrength) {
            case 0:
                return 'Very weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Medium';
            case 3:
                return 'Strong';
            case 4:
                return 'Extremely Strong';
            default:
                return 'Enter a password';
        }
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
            setFormMessage(loginForm, 'error', 'Invalid username/password combination');
        });

        document.querySelectorAll('.form__input').forEach(inputElement => {
            inputElement.addEventListener('blur', (e) => {
                if (e.target.id === 'signUpUsername') {
                    const username = e.target.value.trim();
                    if ((username.length < 7 || username.length > 15) || !/^[A-Za-z0-9_-]+$/.test(username)) {
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
                    const strength = zxcvbn(password); // Calculate password strength
                    setPasswordStrength(strength.score); // Update passwordStrength state
                    if (password.length < 7 || password.length > 30 || strength.score < 2) {
                        e.preventDefault();
                        setInputError(inputElement, 'Please enter a password with a minimum of seven characters and a maximum of thirty characters that is strong enough.');
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
    }, []);

    return (
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
                            <div className="form__password-strength">
                                Password Strength: {getPasswordStrengthText()}
                            </div>
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
