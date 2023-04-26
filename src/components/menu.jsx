import React, { useState, useRef, useEffect } from 'react'
import { Close } from '../icons/icons'
import { Link } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'

import data from '../data/produtcs.json'


//Framer variants
const parent = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 1,
        },
    },
};

const titleSlideUp = {
    initial: {y: 200},
    animate: {y: 0},
};

const maskAnimation = {
    initial: { width: "100%"},
    animate: { width: 0},
};

//Transition
const transition = {duration: .8, ease: [0.6, -0.05, 0.01, 0.9]};


export default function Menu({menuState, setMenuState, x, y, setCursorHovered}) {
  return (
    <AnimatePresence>
        {menuState && (
            <>
                <motion.div 
                    initial={{visibility: 'hidden'}}
                    animate={{visibility: 'visible', transition: {delay: 1}}}
                    exit={{visibility: 'hidden', transition: {delay: 1}}}  
                    className='products'>
                    <div className="menu-title">Products</div>
                    <div 
                        onClick={()=> setMenuState(!menuState)} 
                        onMouseEnter={()=> setCursorHovered(true)}
                        onMouseLeave={()=> setCursorHovered(false)}
                        className="close">
                        <Close/>
                    </div>
                    <div className="menu">
                        <div className="container">
                            <div className="menu-inner">
                                <motion.ul
                                    variants={parent}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'

                                >
                                    {data.map( list => (
                                        <List 
                                            key={list.id}
                                            id={list.id}
                                            title={list.title}
                                            src={list.src}
                                            leftLineFlex={list.leftLineFlex}
                                            rightLineFlex={list.rightLineFlex}
                                            thumbnailPosition={list.thumbnailPosition}
                                            x={x}
                                            y={y}
                                            offset={list.offset}
                                            setCursorHovered={setCursorHovered}
                                        />
                                    ))}
                                </motion.ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <Panels/>
            </>
        )}
    </AnimatePresence>
  )
}

const List = ({title, src, leftLineFlex, rightLineFlex, thumbnailPosition, id, x, y, offset, setCursorHovered}) => {    

    const list = useRef()

    const [ hoverState, setHoverState ] = useState(false);
    const [listPosition, setListPosition] = useState({
        top: 0,
        left: 0
    });

    useEffect(() => {
        setListPosition({
            top: list.current.getBoundingClientRect().top,
            left: list.current.getBoundingClientRect().left,
        })
    }, [hoverState])
    

    return (
        <li ref={list}>
            <Link to={`/sneaker/${id}`}>
                <div className="wrapper">
                    <div className={`line left flex-${leftLineFlex}`}>
                        <motion.div 
                            variants={maskAnimation} 
                            transition={{...transition, duration: 1}} 
                            className="mask">                                
                        </motion.div>
                    </div>
                    <motion.div 
                        className="title" 
                        onHoverStart={()=>{setHoverState(true)}} 
                        onHoverEnd={()=>{setHoverState(false)}}
                        onMouseEnter={()=> setCursorHovered(true)}
                        onMouseLeave={()=> setCursorHovered(false)}>
                        <h2>
                            <motion.div 
                                variants={titleSlideUp} 
                                transition={transition} 
                                className="text">{title}
                            </motion.div>
                        </h2>
                    </motion.div>
                    <div className="thumbnail" style={{left: thumbnailPosition}}>
                        <img src={src}></img>
                        <motion.div 
                            variants={maskAnimation} 
                            transition={{...transition, duration: 1}} 
                            className="mask">                                
                        </motion.div>
                    </div>
                    <motion.div 
                        initial={{opacity: 0}} 
                        animate={{opacity: hoverState ? 1 : 0, x: x - listPosition.left + offset, y: y - listPosition.top}}
                        transition={{ease: 'linear'}}
                        className="floating-image">
                        <img src={src}></img>
                    </motion.div>
                    <div className={`line right flex-${rightLineFlex}`}>
                        <motion.div variants={maskAnimation} transition={{...transition, duration: 1}}  className="mask right"></motion.div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

const Panels = () => {

    const [panelComplete, setPanelComplete] = useState(false);

    return (
        <>
            <motion.div 
                style={{background: panelComplete ? "#e7e7de" : "#e7dee7",}}
                initial={{ height: 0 }}
                animate={{height: [0, window.innerHeight, 0], bottom: [window.innerHeight, 0, 0]}}
                exit={{height: [0, window.innerHeight, 0], top: [null, 0, 0]}}
                transition={{...transition, duration: 2, times: [0, 0.5, 1]}}             
                className="left-panel-background">                    
            </motion.div>
            <motion.div 
                style={{background: panelComplete ? "#e7e7de" : "#e7dee7",}}
                initial={{ height: 0 }}
                animate={{height: [0, window.innerHeight, 0], bottom: [0, 0, window.innerHeight]}}
                exit={{height: [0, window.innerHeight, 0], bottom: [null, 0, 0]}}
                transition={{...transition, duration: 2, times: [0, 0.5, 1]}}             
                className="right-panel-background"
                onAnimationComplete={() => {setPanelComplete(!panelComplete)}}>                    
            </motion.div>
        </>
    )
}
