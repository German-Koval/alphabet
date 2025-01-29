import React from 'react';
import "./header.css";



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
                    <button onClick={() => props.setActiveElem({ type: 'guessGame' })}
                        className={(props.activeElem === 'guessGame') ? "glow-button-active icon" : "glow-button icon"}> 
                    </button>
                    <button onClick={() => props.setActiveElem({ type: 'table' })}
                        className={(props.activeElem === 'table') ? "glow-button-active" : "glow-button"}> А ა
                    </button>
                    <button onClick={() => props.setActiveElem({ type: 'instruction' })}
                        className={(props.activeElem === 'instruction') ? "glow-button-active" : "glow-button"}> ?
                    </button>
                </div>
            </header>
            <div className='header-line'></div>
        </>

    )
}
