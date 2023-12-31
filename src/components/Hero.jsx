// hero is a large image spanning across the webpage
import React from "react";
import { Button } from './Button.jsx';
import '../App.css';
import './Hero.css';

function Hero() {
    return (
        <div className="hero-container">
            <video src='/videos/nurburgringDrive.mp4' autoPlay loop muted />
            <h1>THIS COULD BE YOU!</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button className="btns"
                    buttonStyle="btn--outline"
                    buttonSize='btn--large'
                >BEGIN YOUR JOURNEY!</Button>

                <Button
                    className="btns"
                    buttonStyle="btn--primary"
                    buttonSize='btn--large'
                >WATCH TRAILER!<div className="play-circle" /></Button>
            </div>
        </div>
    )
}

export default Hero;