import React, { useContext } from "react";
import ReactDOM from 'react-dom/client';
import './table.css'
import { Alphabet } from "../app/app";

export default function Table() {

    const langAlphData = useContext(Alphabet)
    

    const  time = langAlphData.map((item) =>{
        const key = Math.random()
         return(<div className='row' key={key}>
            <div className='langSym line-element'>{item.langSym}</div>
            <div className='rusSym line-element'>{item.rusSym}</div>
            <div className='pronun line-element'>{item.pronun}</div>
            <div className='engSym line-element'>{item.engSym}</div>
         </div>)
     });
    return(
        <div className="table">
           {time} 
        </div>
    )
}

