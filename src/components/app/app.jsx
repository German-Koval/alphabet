import React, { useReducer, createContext } from 'react';
import Table from './table/table.jsx'
import Guess from './guess/guess.jsx';
import Instruction from './instruction/instruction.jsx';
import langAlphData from '../../data/alphabets.jsx'
import Header from './header/header.jsx';
import './app.css'
import { Route, Routes, Link } from 'react-router';
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






   return (
      <div className='app'>
         <Header points={points} />
         <Alphabet.Provider value={langAlphData}>
            <Routes>
               <Route path="*" element={<Guess className="guess-card" setPoints={setPoints} />}></Route>
               <Route path='example' element={<Table className="activeElem-container" />} />
               <Route path='instruction' element={<Instruction />} />
               <Route path='game' element={<Guess className="guess-card" setPoints={setPoints} />} />
               <Route index element={<Guess className="guess-card" setPoints={setPoints} />} />
            </Routes>
         </Alphabet.Provider>
      </div>
   )
}

export { App, Alphabet }