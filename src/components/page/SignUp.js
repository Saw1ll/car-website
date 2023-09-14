import { Link } from "react-router-dom";
import React from "react";
import '../../App.css';
import '../SignUp.css';

export default function SignUp() {
    return (
        <>
            <div className='signup-body'>
                <div className='signup-container'>
                    <form className='form' id='login'>
                        <h1 className="form__title">Login</h1>
                        <div className="form__message form__message--error"></div>
                        <div className="form__input-group">
                            <input type="text" autoFocus className="form__input" placeholder='Username or email' />
                            <div className="form__input-error-message">This is an error message</div>
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
                </div>
            </div>
        </>
    )
}