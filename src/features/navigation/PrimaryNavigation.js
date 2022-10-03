import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './primaryNavigation.css';
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";
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



const PrimaryNavigation = (navigationItems) => {
  let isActive = false;
  const dispatch = useDispatch();
      
  const onClickToggleNavigation = (event, name) => { 
        if (event.target.classList.contains('active')) {
          event.target.classList.remove('active');
          isActive = false;
        } else {
          event.target.classList.add('active');
          isActive = true;
        }
          dispatch(toggle(name))
      }
        
const menuToggle = useSelector(state => state.toggle['primary_menu']);

  /*
    let currentLocation = String(useLocation().pathname),
    backLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/"));*/


  return (
     
    <div className={'main-nav'}>


    {/* toggle menu button */}
    <motion.button
      initial={'initial'}
      animate={'animate'}
      exit={'exit'}
      whileHover={'hover'}
      transition={'transition'}
      className={(isActive) ? 'main-nav__toggle-button active' : 'main-nav__toggle-button'} 
      onClick={event => onClickToggleNavigation(event, 'primary_menu')} >
      <motion.span variants={menuToggle ? burgerMenuExit[0]:  burgerMenu[0]}>|</motion.span>
      <motion.span variants={menuToggle ? burgerMenuExit[1]:  burgerMenu[1]}>|</motion.span>
      <motion.span variants={menuToggle ? burgerMenuExit[2]:  burgerMenu[2]}>|</motion.span>
      
    </motion.button> 
    
    <Toggle id={'primary_menu'}>
    {/* main menu */}
    <div className={(isActive === false) ? 'main-nav__wrapper main-nav__wrapper--hidden' : 'main-nav__wrapper main-nav__wrapper--show'}>      
      <ul className={'main-nav__list'}>
        <li className={'main-nav__item'}>
          <Link to={'/about'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >about</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/projects'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >projects</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/contact'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >contact</Link>
        </li>
      </ul>  
    </div>
    </Toggle>
  
      {/* navigate back button */}
    
 


  
  
{/* END .main-nav-wrapper */}
</div>
    
  );
};

export default PrimaryNavigation;



// add this for counts: <span className={'filter-count'}>{filter.countFilter} / {filter.countTotal}</span>