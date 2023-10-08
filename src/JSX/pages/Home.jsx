import React from 'react';
import '../../App.css';
import Hero from '../components/jsx/Hero.jsx';
import Cards from '../components/jsx/Cards.jsx';
import Footer from '../components/jsx/Footer.jsx';

function Home() {
    return (
        <>
            <Hero />
            <Cards />
            <Footer />
        </>
    )
}

export default Home;