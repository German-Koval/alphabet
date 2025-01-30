import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './components/app/app.jsx';
import { HashRouter, Routes, Route, Navigate } from "react-router";


console.log('/alphabet/')


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter basename={'/'}>
      <Routes>
        <Route path='/*' element={<App />}/> 
        <Route index element={<App />}/>

       <Route path='*' element={<Navigate  to='/'/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>
);


;
