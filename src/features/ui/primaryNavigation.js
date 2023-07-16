import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import './primaryNavigation.css';
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

/*- - - - - - -- - - - - - - - - - - - - - - - - - - - - - - -*\
|                        ANIMATION                             |
\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Constants
const transition = {duration: .2, ease: [0.3, 0.13, 0.13, 0.96]}


// Variants
const burgerMenu = [
  { 
    //initial: {y: -4, rotate: 0},
    animate: {y: 0, rotate: 0},
    hover: { y: -4, transition: transition },
  },
  { 
    animate: {scale: 0}, 
    hover: { scale: 1, opacity: 1, transition: {duration: .1, ease: [0.3, 0.13, 0.13, 0.96]} },
  },
  { 
    //initial: {y: 4, rotate: 0},
    animate: {y: 0, rotate: 0},
    hover: { y: 4, transition: transition }, 
  }
];
const burgerMenuExit = [
  { 
    //initial: {y: -4, rotate: 0},
    animate: {y: 6, rotate: 45, transition: {duration: .2, ease: [0.3, 0.13, 0.13, 0.96]} },
    //animate: {y: 0, transition: {duration: .2, rotate: 45, ease: [0.3, 0.13, 0.13, 0.96]} },
    hover: { y: 6, rotate: 0, transition: transition },
    //exit: {y: 0, opacity: 0, transition: {duration: 1, ease: [0.3, 0.13, 0.13, 0.96]} },
  },
  { 
    animate: {scale: 0}, 
    hover: { scale: 1, opacity: 0, transition: {duration: .1, ease: [0.3, 0.13, 0.13, 0.96]} },
    //exit: {y: 0, opacity: 0, transition: {duration: 1, ease: [0.3, 0.13, 0.13, 0.96]} },
  },
  { 
    //initial: {y: 4, rotate: 0 },
    animate: {y: -6, rotate: -45, transition: {duration: .2, ease: [0.3, 0.13, 0.13, 0.96]} },
   // animate: {y: 0, transition: {duration: .2, rotate: 45, ease: [0.3, 0.13, 0.13, 0.96]} },
    hover: {y: -7, rotate: 0, transition: transition }, 
    //exit: {y: 0, opacity: 0, transition: {duration: 1, ease: [0.3, 0.13, 0.13, 0.96]} },
  }
];



const PrimaryNavigation = (props) => {
  const {children} = props;
  let isActive = false;
  const testy = useSelector(state => state.toggle);
  const [isOpen, setIsOpen] = useState(false);

  const onClickToggleNavigation = (event) => { 
    setIsOpen(!isOpen);

    console.log(testy);
        if (event.target.parentElement.classList.contains('active')) {
          event.target.parentElement.classList.remove('active');
          isActive = false;
        } else {
          event.target.parentElement.classList.add('active');
          isActive = true;
        }
          //dispatch(toggle(name));
          console.log(testy);
      }
        
const menuToggle = useSelector(state => state.toggle['primary_menu']);

let currentLocation = String(useLocation().pathname),
backLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/"));
if (currentLocation.includes("work")) {
  if ((currentLocation.substring(0, currentLocation.lastIndexOf("/")) === "/work") || (currentLocation.substring(0, currentLocation.lastIndexOf("/")) === "")) {
    console.log(currentLocation.substring(0, currentLocation.lastIndexOf("/")));
    backLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/"));
  } else {
    backLocation = "/work";
  }

  
}

  /*
    let currentLocation = String(useLocation().pathname),
    backLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/"));*/


  return (
    <>
    <div className={'main-nav'}>


    {/* toggle menu button */}
    <motion.button
      initial={'initial'}
      animate={'animate'}
      exit={'exit'}
      whileHover={'hover'}
      transition={'transition'}
      className={(isActive) ? 'main-nav__toggle-button active' : 'main-nav__toggle-button'} 
      onClick={event => onClickToggleNavigation(event)} >
      <motion.span variants={menuToggle ? burgerMenuExit[0]:  burgerMenu[0]}>|</motion.span>
      <motion.span variants={menuToggle ? burgerMenuExit[1]:  burgerMenu[1]}>|</motion.span>
      <motion.span variants={menuToggle ? burgerMenuExit[2]:  burgerMenu[2]}>|</motion.span>
      
    </motion.button> 
    

    <div className={'main-nav__menu'}>
    {/* main menu */}
    <div className={(isActive === false) ? 'main-nav__wrapper main-nav__wrapper--hidden' : 'main-nav__wrapper main-nav__wrapper--show'}>      
      <ul className={'main-nav__list'}>
        <li className={'main-nav__item'}>
          <Link to={'/about'} onClick={event => onClickToggleNavigation(event)} >about</Link>
        </li>
        {/*<li className={'main-nav__item'}>
          <Link to={'/showreel'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >showreel</Link>
        </li>*/}
        <li className={'main-nav__item'}>
          <Link to={'/work'} onClick={event => onClickToggleNavigation(event)} >work</Link>
        </li>
        
        <li className={'main-nav__item'}>
          <Link to={'/photo'} onClick={event => onClickToggleNavigation(event)} >photo</Link>
        </li>
        
        
      </ul>  
    </div>
    </div>
  

    


 

{children}
  
  
{/* END .main-nav-wrapper */}
</div>
<div className={'bottom-nav'}>
       {/* navigate back button */}
    
       <Link to={`${backLocation}`} className={'back__link'}>
        <button className={currentLocation === '/' ? `hide back__button` : `back__button`}>
          <img alt={'go back'} src={'/icons/left-arrow.png'} />
        </button>
      </Link> 
</div>
</> 
  );
};

export default PrimaryNavigation;



// add this for counts: <span className={'filter-count'}>{filter.countFilter} / {filter.countTotal}</span>