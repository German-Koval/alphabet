import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./letterCard.css"
import SoundIcon from "./sound.svg"

export default function LetterCard(props) {


    const [letterClass, setLetterClass] = useState({ isClicked: false, toBeGone: false })

    function handleClick() {
        setLetterClass({ ...letterClass, isClicked: true })
        props.answer()
    }
    function pronunSound(event) {
        event.stopPropagation()
        const { letter } = props
        const sound = new Audio(`/audio/${letter.soundSrcId}_.mp3`)
        sound.autoplay = false
        sound.play()
    }
    function renderLetterCard() {
        let classObj = 'letter-card'
        if (letterClass.isClicked) classObj += ' letter-card-isClicked';
        if (props.toBeGone) classObj += ' letter-toBeGone';
        return classObj
    }

    const { letter, order } = props
    const { rusSym, rusComm, pronun, langName, engSym, } = letter


    return (
        <div onClick={handleClick} className={renderLetterCard()} style={{ order: order }}>
            <div className='rus-sym-container'>
                <div className='rus-sym'>{rusSym}</div>
                <div className='sound-icon' onClick={pronunSound}></div>
            </div>
            <div className='pronunciaton-container'>
                <div className='pronunciaton-comment'>{rusComm}</div>
                <div className='pronunciaton'>{pronun}</div>
            </div>
            <div className='extra-info-container'>
                <div className='lang-name'>{langName}</div>
                <div className='eng-symbol'>{engSym}</div>
            </div>
        </div>
    )
}



