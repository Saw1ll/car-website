import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn"; // Import the zxcvbn library
import axios from 'axios';
import '../../App.css';
import '../SignUp.css';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState('');

    function setInputError(inputElement, message) {
        inputElement.classList.add('form__input--error');
        inputElement.parentElement.querySelector('.form__input-error-message').textContent = message;
    }

    function clearInputError(inputElement) {
        inputElement.classList.remove('form__input--error');
        inputElement.parentElement.querySelector('.form__input-error-message').textContent = '';
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Select the values from each of the ids 'signUp(Username/Email/Password) and save to a variable
        const username = document.querySelector('#signUpUsername').value;
        const email = document.querySelector('#signUpEmail').value;
        const password = document.querySelector('#signUpPassword').value;

        // POST REQUEST
        try {
            const response = await axios.post('http://localhost:3000/api/users', {
                name: username,
                email,
                password
            });
            if (response.status === 201) {
                setRegistrationSuccess(true);
                setRegistrationError(''); // Clear any previous error
            } else {
                setRegistrationError('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error === 'Email is already in use') {
                    setRegistrationError('Email or username is already in use');
                } else {
                    setRegistrationError('An error occurred. Please try again later.');
                }
            } else {
                setRegistrationError('An error occurred. Please try again later.');
            }
        }

}


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

function getPasswordStrengthClass(strength) {
    if (strength === 0) {
        return 'password-veryweak';
    } else if (strength === 1) {
        return 'password-weak';
    } else if (strength === 2) {
        return 'password-medium';
    } else if (strength === 3) {
        return 'password-strong';
    } else if (strength === 4) {
        return 'password-verystrong';
    } else {
        return ''; // Handle the default case or invalid input
    }
}


useEffect(() => {
    const signupForm = document.querySelector('#createAccount');
    const createAccountLink = document.querySelector('#linkCreateAccount');

    document.querySelectorAll('.form__input').forEach(inputElement => {
        inputElement.addEventListener('blur', (e) => {
            if (e.target.id === 'signUpUsername') {
                const username = e.target.value.trim();
                if ((username.length < 4 || username.length > 15) || !/^[A-Za-z0-9_-]+$/.test(username)) {
                    e.preventDefault();
                    setInputError(inputElement, 'Username must be at least four but less than sixteen characters in length and can only contain alphanumeric characters, hyphens, or underscores.');
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
}, []);

// ... (import statements and useState declarations)

return (
    <>
        <div className="signup-body">
            <div className="signup-container">
                <form className='form' id='createAccount'>
                    <h1 className="form__title">Create Account</h1>

                    {/* Registration Success Message */}
                    {registrationSuccess && (
                        <p className="form__message--success">Registration successful! You can now <Link className='form__link' to='/log-in' id='linkLogin'>log in</Link>!</p>
                    )}

                    {/* Registration Error Message */}
                    {!registrationSuccess && registrationError && (
                        <p className="form__message--error">{registrationError}</p>
                    )}

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

                        {/* Password Strength Indicator */}
                        <div className={`form__password-strength ${getPasswordStrengthClass(passwordStrength)}`}>
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

                    <button
                        className="form__button"
                        type='submit'
                        id='createAcc-continueButton'
                        onClick={handleRegistration}
                    >
                        Continue
                    </button>
                    <p className="form__text">
                        <Link className='form__link' to='/log-in' id='linkLogin'>Already have an account? Click to login</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
)
}
