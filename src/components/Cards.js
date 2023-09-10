import React from "react";
import CardItem from "./CardItem";
import './Cards.css';

function Cards() {
    return (
        <>
            <div className="cards">
                <h1>Check out these AWESOME cars you could be driving!</h1>
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <ul className="cards__items">
                            <CardItem
                                src='images/zondahuayra.jpg'
                                text='You can drive cars such as the Zonda Huayra..'
                                label='Intense'
                                path='/services' />

                            <CardItem
                                src='images/slk250.webp'
                                text='... or you could try a more chill but exuberant drive in a Mercedes SLK 250!'
                                label='Intense'
                                path='/services' />
                        </ul>
                        <ul className="cards__items">
                            <CardItem
                                src='images/FordGT2017.jpg'
                                text='Come round our track to drive the exquisite Ford GT 2017!'
                                label='Rapid'
                                path='/services' />

                            <CardItem
                                src='images/subaruRally.jpg'
                                text='Experience the rivoting experience of a Subaru racing through valleys of dirt!'
                                label='Excitement'
                                path='/services' />

                            <CardItem
                                src='images/FordGT2017.jpg'
                                text='Come round our track to drive the exquisite Ford GT 2017!'
                                label='Rapid'
                                path='/services' />

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
