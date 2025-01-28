import React, { useReducer, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Table from '../table';
import "./app.css"
import Guess from '../guess';
import Instruction from '../instructions';
import langAlphData from '../../data/alphabets'
import Header from '../header';
const Alphabet = createContext()

function App() {
   const [points, setPoints] = useReducer(pointsReducer, { total: 0, streak: 0, isCounted: false, accuracy: 0, answeredAmount: 0 })

   function pointsReducer(points, action) {
      let { total, streak, isCounted, accuracy, answeredAmount } = points
      switch (action.type) {
         case 'increase': {
            const bonus = (streak > 6) ? 3 : (streak > 3) ? 2 : 1;
            return {
               total: total + bonus,
               streak: streak + 1,
               isCounted: false,
               accuracy: (isCounted ? accuracy-- : accuracy + 1),
               answeredAmount: isCounted ? answeredAmount : answeredAmount + 1
            }
         }
         case 'decrease': {
            if (!isCounted) {
               return { ...points, total: total - 1, streak: 0, isCounted: true, answeredAmount: answeredAmount + 1 }
            } else { return { ...points } }
         }
         case 'restart': {
            return { total: 0, streak: 0, isCounted: false, accuracy: 0, answeredAmount: 0 }
         }
      }
   }



   const [activeElem, setActiveElem] = useReducer(ElemReducer, 'guessGame')



   function ElemReducer(activeElem, action) {
      switch (action.type) {
         case 'table': {
            if (activeElem === 'table') {
               return 'guessGame'
            } else {
               return 'table'
            }
         }
         case 'instruction': {
            if (activeElem === 'instruction') {
               return 'guessGame'
            } else {
               return 'instruction'
            }
         }
      }
   }



   function item() {
      switch (activeElem) {
         case 'table': return <Table className="activeElem-container" />;
         case 'instruction': return <Instruction />;
         case 'guessGame': return <Guess className="guess-card" setPoints={setPoints} />
      }
   }

   return (
      <div className='app'>
         <Header setActiveElem={setActiveElem} activeElem={activeElem} points={points} />
         <Alphabet.Provider value={langAlphData}>
            {item()}
         </Alphabet.Provider>
      </div>
   )
}

export { App, Alphabet }