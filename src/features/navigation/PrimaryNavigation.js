import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import './primaryNavigation.css';
import { Toggle} from "../../components/Toggle";
import { toggle } from "../../components/toggleSlice";




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
        

  
    let currentLocation = String(useLocation().pathname),
    backLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/"));


  return (
     
    <div className={'main-nav'}>


    {/* toggle menu button */}
    <button className={(isActive) ? 'main-nav__toggle-button active' : 'main-nav__toggle-button'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >
      <span>|</span>
      <span>|</span>
    </button>
    <Toggle id={'primary_menu'}>
    {/* main menu */}
    <div className={(isActive === false) ? 'main-nav__wrapper main-nav__wrapper--hidden' : 'main-nav__wrapper main-nav__wrapper--show'}>      
      <ul className={'main-nav__list'}>
        <li className={'main-nav__item'}>
          <Link to={'/about'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >about</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/projects'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >animation & vfx</Link>
        </li>
        <li className={'main-nav__item'}>
          <Link to={'/contact'} onClick={event => onClickToggleNavigation(event, 'primary_menu')} >contact</Link>
        </li>
      </ul>  
    </div>
    </Toggle>
  
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