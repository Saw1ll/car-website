import React from "react";
import CardItem from "./CardItem";
import './Cards.css';

function Cards() {
    return (
        <>
            <div className="cards">
                <h1>Check out these AWESOME Races!</h1>
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <ul className="cards__items">
                            <CardItem
                                src='images/zondahuayra.jpg'
                                text='You can drive cars such as the Zonda Huayra!'
                                label='Intense'
                                path='/services' />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
