import React, { useReducer, createContext, useState} from 'react';

import "./header.css"



 export default function Header(props) {
      
    const { total, streak, isCounted,accuracy,answeredAmount} = props.points
    const accuracyValue = answeredAmount ? Math.floor(accuracy/answeredAmount*100) : 0
    return (
        <>
            <header>
                <button onClick={() => props.setActiveElem({ type: 'table' })}
                    className={(props.activeElem === 'table') ? "glow-button-active" : "glow-button"}> А ა
                </button>
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
                <button onClick={() => props.setActiveElem({ type: 'instruction' })}
                    className={(props.activeElem === 'instruction') ? "glow-button-active" : "glow-button"}> ?
                </button>
            </header>
            <div className='header-line'></div>
        </>

    )
}
