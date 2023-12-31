import React from 'react';
import { Button } from './Button.jsx';
import './Footer.css';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <>
            <div className='footer-container'>
                <section className='footer-subscription'>
                    <p className='footer-subscription-heading'>
                        Join the SWRT log newsletter to receive the best track deals
                    </p>
                    <p className='footer-subscription-text'>
                        You can unsubscribe at any time.
                    </p>
                    <div className='input-areas'>
                        <form>
                            <input type='email' name='email' placeholder='Your Email' className='footer-input' />
                            <Button buttonStyle='btn--outline'>Subscribe!</Button>
                        </form>
                    </div>
                </section>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Us</h2>
                            <Link to='/sign-up'>How it works</Link>
                            <Link to='/'>Testimonials</Link>
                            <Link to='/'>Careers</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Services</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Contact Us</h2>
                            <Link to='/'>Contact</Link>
                            <Link to='/'>Support</Link>
                            <Link to='/'>Racetracks</Link>
                            <Link to='/'>Sponsorships</Link>
                        </div>
                    </div>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>Video</h2>
                            <Link to='/'>Submit Video</Link>
                            <Link to='/'>Ambassadors</Link>
                            <Link to='/'>Agency</Link>
                            <Link to='/'>Influencer</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Social Media</h2>
                            <Link to='https://www.instagram.com'>Instagram</Link>
                            <Link to='https://www.facebook.com'>Facebook</Link>
                            <Link to='https://www.youtube.com'>YouTube</Link>
                            <Link to='https://www.linkedin.com'>LinkedIn</Link>
                            <Link to='https://www.twitter.com'>X</Link>
                        </div>
                    </div>
                </div>
                <section className='social-media'>
                    <div className='social-media-wrap'>
                        <div className='footer-logo'>
                            <Link className='social-logo'>
                                SWRT
                            </Link>
                        </div>
                        <small className='website-rights'>TRVL © 2023</small>
                        <div className='social-icons'>
                            <Link
                                className='social-icon-link facebook'
                                to='https://www.facebook.com'
                                target='_blank'
                                aria-label='Facebook'
                            >
                                <div className='facebook-logo' />
                            </Link>
                            <Link
                                className='social-icon-link instagram'
                                to='https://www.instagram.com'
                                target='_blank'
                                aria-label='Instagram'
                            >
                                <div className='instagram-logo' />
                            </Link>
                            <Link
                                className='social-icon-link youtube'
                                to='https://www.youtube.com'
                                target='_blank'
                                aria-label='YouTube'
                            >
                                <div className='youtube-logo' />
                            </Link>
                            <Link
                                className='social-icon-link linkedin'
                                to='https://www.linkedin.com'
                                target='_blank'
                                aria-label='LinkedIn'
                            >
                                <div className='linkedin-logo' />
                            </Link>
                            <Link
                                className='social-icon-link x'
                                to='https://www.twitter.com'
                                target='_blank'
                                aria-label='X'
                            >
                                <div className='x-logo' />
                            </Link>
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}

export default Footer;