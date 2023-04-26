import React, { useState } from 'react'
import "./styles/app.scss";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import { motion } from 'framer-motion';

import { Home, Sneaker } from './pages';
import { Header, Menu } from './components';
import useMousePosition from './hooks/useMousePosition';

function App() {
  
  const [menuState, setMenuState] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);

  const { x, y } = useMousePosition();

  return (
    <>
     <Router>
        <div className='App'>  
        <motion.div 
          animate={{
            x: x - 16,
            y: y - 16,
            scale: cursorHovered ? 1.2 : 1,
            opacity: cursorHovered ? .8 : 0,
          }}
          transition={{
            ease: 'linear',
            duration: 0.1
          }}       
          className="cursor"></motion.div>     
        <Header setMenuState={setMenuState} setCursorHovered={setCursorHovered}/>  
        <Menu x={x} y={y} menuState={menuState} setMenuState={setMenuState} setCursorHovered={setCursorHovered}/>
          <div className='container'>
            <div className='wrapper'>
              <div className='home'>
                <Routes>
                  <Route exact path='/' element={<Home/>} />  
                  <Route exact path='/sneaker/:id' element={<Sneaker/>} />                     
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
     
    </>
  )
}

export default App
