import React from 'react';
import "./header.css";
import { NavLink } from 'react-router';


export default function Header(props) {

    const { total, streak, isCounted, accuracy, answeredAmount } = props.points
    const accuracyValue = answeredAmount ? Math.floor(accuracy / answeredAmount * 100) : 0
    return (
        <>
            <header>

                <div className='header-block'>
                    <div className='header-block__title'>очки</div>
                    <div className='header-block__value'>{total}</div>
                </div>
                <div className='header-block'>
                    <div className='header-block__title'>точность</div>
                    <div className='header-block__value'>{accuracyValue}%</div>
                </div>
                <div className='header-block'>
                    <div className='header-block__title'>за ход</div>
                    <div className='header-block__value'>+{(streak > 6) ? 3 : (streak > 3) ? 2 : 1}</div>
                </div>
                <div className='button-container'>
                    <div className='button-border'></div>
                    <NavLink  to='/game'  className={({isActive}) => isActive ? "glow-button-active icon" : "glow-button icon" }></NavLink>
                    <div className='button-border'></div>
                    <NavLink  to='/example'  className={({isActive}) => isActive ? "glow-button-active alphabet" : "glow-button alphabet" }>А ა</NavLink>
                    <div className='button-border'></div>
                    <NavLink  to='/instruction'  className={({isActive}) => isActive ? "glow-button-active " : "glow-button " }>?</NavLink>
                    <div className='button-border'></div>
                </div>
            </header>
            <div className='header-line'></div>
        </>

    )
}
