import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavigation } from "./primaryNavigationSlice";
import { useLocation, Link } from "react-router-dom";
import './primaryNavigation.css';


const PrimaryNavigation = (navigationItems) => {
    const isActive = useSelector(toggleNavigation).payload.primaryNavigation;

    const dispatch = useDispatch();

    const onClickChangeHandler = () => {
        if (isActive) {
            dispatch(toggleNavigation(false));
            
        } else {
            dispatch(toggleNavigation(true));
            
        }
      };
    
    
        

  
    let currentLocation = String(useLocation().pathname),
    backLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/"));


  return (
     
    <div className={'main-nav'}>

    {/* toggle menu button */}
    <button className={(isActive) ? 'main-nav__toggle-button active' : 'main-nav__toggle-button'} onClick={onClickChangeHandler} >
      <span>|</span>
      <span>|</span>
    </button>

    {/* main menu */}
    <div className={(isActive === false) ? 'main-nav__wrapper main-nav__wrapper--hidden' : 'main-nav__wrapper main-nav__wrapper--show'}>      
      <ul className={'main-nav__list'}>
        <li className={'main-nav__item'}>
          <Link to={'/about'} onClick={onClickChangeHandler} >about</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/projects'} onClick={onClickChangeHandler} >animation & vfx</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/contact'} onClick={onClickChangeHandler} >contact</Link>
        </li>
      </ul>  
    </div>

  
      {/* navigate back button */}
    
  <Link to={`${backLocation}`} className={'back__link'}>
        <button className={currentLocation === '/' ? `hide back__button` : `back__button`}>
          <img alt={'go back'} src={'/icons/left-arrow.png'} />
        </button>
      </Link> 


  
  
{/* END .main-nav-wrapper */}
</div>
    
  );
};

export default PrimaryNavigation;



// add this for counts: <span className={'filter-count'}>{filter.countFilter} / {filter.countTotal}</span>