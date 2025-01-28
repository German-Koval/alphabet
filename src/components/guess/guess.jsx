import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import "./guess.css"
import LetterCard from '../letter-card';
import { Alphabet } from "../app/app";



export default function Guess(props) {
    const langAlphData = useContext(Alphabet)
    const [idData, setIdData] = useState(() => createIdData()) //array of possible langAlphData id values 
    const [letterID, setLetterID] = useState(null) 


    const [rightLetter, setRightLetter] = useState(null)
    const [wrongLetter1, setWrongLetter1] = useState(null)
    const [wrongLetter2, setWrongLetter2] = useState(null)
    const [prevLetter, setPrevLetter] = useState(null)


    const [toBeGone, setToBeGone] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [randomKey, setRandomKey] = useState(Math.random()) //forcing letter card rerender

    function createIdData() { // create array of possible langAlphData id values 
        const newIdData = []
        for (let i = 0; i < langAlphData.length; i++) {
            newIdData.push(i)
           
        }
       
        return newIdData
    }

    useEffect(() => {
        restartGame()
    }, [])

    function restartGame() {
        const idData = createIdData()
        const startID = randomElem(idData)
        const rightLetter = langAlphData[idData[startID]]
        const wrongVars = updateWrongVars(rightLetter)
        setLetterID(randomElem(idData));
        setWrongLetter1(wrongVars[0])
        setWrongLetter2(wrongVars[1])
        setRandomKey(Math.random())
        props.setPoints({type: 'restart'})
        setIdData(idData)
        setToBeGone(false)
        setRightLetter(rightLetter)
        setGameOver(false)
    }



    function updateWrongVars(rightLetter) {
        let wrongLetter1 = langAlphData[randomElem(langAlphData)]
        while (rightLetter.langSym === wrongLetter1.langSym) {
            wrongLetter1 = langAlphData[randomElem(langAlphData)]
        }
        let wrongLetter2 = langAlphData[randomElem(langAlphData)]
        while (rightLetter.langSym === wrongLetter2.langSym || wrongLetter1.langSym === wrongLetter2.langSym) {
            wrongLetter2 = langAlphData[randomElem(langAlphData)]
        }
        return [wrongLetter1, wrongLetter2]
    }

    function randomElem(array) {
        return Math.floor(Math.random() * (array.length - 1))
    }

    function nextLetter() {
        setPrevLetter(langAlphData[idData[letterID]]);
        setToBeGone(true) // for animation
        const newArr = [...idData].toSpliced(letterID, 1)
        if (newArr.length === 0) {
            setGameOver(true)
            return
        }
        const newLetterID = randomElem(newArr)
        const rightLetter = langAlphData[newArr[newLetterID]]
        const wrongVars = updateWrongVars(rightLetter)
        setIdData(newArr)
        setLetterID(newLetterID)
        setTimeout(() => {
            setToBeGone(false);
            setWrongLetter1(wrongVars[0])
            setWrongLetter2(wrongVars[1])
            setRightLetter(rightLetter)
        }, 425);
    }

    function wrongAnsw() {
        props.setPoints({type:'decrease'})
    }

    function rightAnsw() {
       
        props.setPoints({type:'increase'})
        setRandomKey(Math.random())
        nextLetter()
    }



    if (letterID === null) {
        return (<div className='guess-container'>
            <div className='guess-title'>
                Загрузка
            </div>
        </div>)
    }
    if (gameOver) {
        return (<div className='guess-container'>
            <div className='guess-title newGame' onClick={restartGame}>
                новая игра
            </div>

        </div>)
    }
    const varRight = langAlphData[idData[letterID]]
    const varRightClone = (prevLetter === null) ? undefined : prevLetter.langSym
    

    return (
        <div className='guess-container'>
            <div className='currentLetter-container'>
                <span className='currentLetter' key={5 * randomKey} >{varRight.langSym}</span>
                <span className='currentLetter currentLetter_clone' key={4 * randomKey}>{varRightClone}</span>
            </div>
            <div className='variants-container'>


                <LetterCard key={1 * randomKey} order={"10"} answer={wrongAnsw} isRight={false} letter={wrongLetter1} toBeGone={toBeGone} />

                <LetterCard key={2 * randomKey} order={"20"} answer={wrongAnsw} isRight={false} letter={wrongLetter2} toBeGone={toBeGone} />

                <LetterCard key={3 * randomKey} order={Math.round(randomKey * 30).toString()} answer={rightAnsw} isRight={true} letter={rightLetter} toBeGone={toBeGone} />

            </div>
        </div>
    )
}

