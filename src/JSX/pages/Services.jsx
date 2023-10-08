import React from "react";
import '../../App.css';
import Footer from "../components/jsx/Footer.jsx";
import CardItem from "../components/jsx/CardItem.jsx";
import '../components/css/cards.css';

export default function Services() {
    return (
        <>
            <h1 className="services">SERVICES</h1>
            <div className="cards">
                <h1>These are the services that we can provide to you while you are on one of our tracks!</h1>
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <ul className="cards__items">
                            <CardItem
                                src='images/michelintires.jpg'
                                text="We can replace your tires so you don't have to lose out on your existing tire quality."
                                label='-15% £97.39 (Was £114.58)'
                            />
                            <CardItem
                                src='images/tuneImage.jpg'
                                text='Stage one tuning (Audi A4), DEPENDS ON CAR'
                                label='-5% £775 (Was £815.79)'
                            />
                        </ul>
                        <ul className="cards__items">
                            <CardItem
                            src='images/monza.jpg'
                            text='You can rent cars such as the Ferrari Laferrari, Porsche GT3 or cars like the Audi RS6 Avant'
                            label='Rent depends on car (Standard pricing is £540 for the day)'
                            />
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}