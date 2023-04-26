import React, { useEffect } from 'react'
import '../styles/app.scss'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ setMenuState, menuState, setCursorHovered }) {

  const {pathname} = useLocation();
    
  useEffect(() => {
    setMenuState(false); // Close the navigation panel
  }, [ pathname ]);    

  return (
    <header>
      <div className="container fluid">
        <div className="header-inner">
          <Link className="active" to="/" onMouseEnter={()=> setCursorHovered(true)} onMouseLeave={()=> setCursorHovered(false)}>
            Pocket.
          </Link>
          <div 
            onClick={()=> setMenuState(!menuState)} 
            className="hamburger-menu"
            onMouseEnter={()=> setCursorHovered(true)}
            onMouseLeave={()=> setCursorHovered(false)}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  )
}
