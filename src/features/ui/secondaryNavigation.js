import React, { useState, useRef, useEffect  } from "react";
import './secondaryNavigation.css';
import Icon from "../../components/Icons/Icon";
import {useDispatch, useSelector} from "react-redux"
import { layout } from "../../components/toggleSlice";


const SecondaryNavigation = (props) => {
  const {children} = props;
 
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const layoutIsh = useSelector(state => state.toggle.layout);
  const onClickHandler = (event) => { 

    setIsOpen(!isOpen);
  }
  const onClickBtnHandler = (event, number) => { 
    
    dispatch(layout(number));
    
    setIsOpen(false);
    setIsMenuOpen(false);
  }
  const onClickToggleHandler = () => { 
    
    
    
    setIsMenuOpen(!isMenuOpen);
  }
  const ref = useRef();

  useOnClickOutside(ref, () => {setIsMenuOpen(false)}); // Detect click outside filters box (try and put in seperat hook so it can be reused)
  

  return (
    <div ref={ref} className={`${isMenuOpen ? 'sec-nav__wrapper--open' : 'sec-nav__wrapper--closed'} sec-nav__wrapper`}>
      <div className={"sec-nav__toggle"}>
        <button 
          className={"sec-nav__btn"}
          onClick={event => onClickToggleHandler(event)}
        >
          <div className={'sec-nav__dot sec-nav__dot-one'}></div>
          <div className={'sec-nav__dot sec-nav__dot-two'}></div>
          <div className={'sec-nav__dot sec-nav__dot-three'}></div>
        </button>
      </div>
      <div className={'sec-nav__menu'}>
      <div className={'layout-btn__wrapper'} >
     <button 
      className={'btn__layout--toggle btn__layout btn__layout--active'}
      onClick={event => onClickHandler(event)}
      >
     {
      layoutIsh === 0 ? 
        <Icon name={'layout-full-solid'} size={26} color={''}></Icon> 
      :
      layoutIsh === 1 ? 
        <Icon name={'layout-one-solid'} size={28} color={''}></Icon> 
      :
      layoutIsh === 2 ? 
        <Icon name={'layout-two-solid'} size={28} color={''}></Icon> 
      :
        <Icon name={'layout-three-solid'} size={28} color={''}></Icon> 
      
      }
     
    </button>
    
    <div className={`bnt__layout-wrapper ${isOpen ? 'bnt__layout-wrapper--active' : ''}` }>
    
    <button 
      className={'btn__layout'}
      onClick={event => onClickBtnHandler(event, 0)}
    >
    <Icon name={'layout-full-solid'} size={26} color={''}></Icon>
    </button>
    <button 
      className={'btn__layout'}
      onClick={event => onClickBtnHandler(event, 1)}
    >
    <Icon name={'layout-one-solid'} size={28} color={''}></Icon>
    </button>
    <button 
      className={'btn__layout'}
      onClick={event => onClickBtnHandler(event, 2)}
    >
    <Icon name={'layout-two-solid'} size={28} color={''}></Icon>
    </button>
    <button 
      className={'btn__layout'}
      onClick={event => onClickBtnHandler(event, 3)}
    >
    <Icon name={'layout-three-solid'} size={28} color={''}></Icon>
    </button>
    </div>
    {children}
    </div>
      
      </div>
    </div> 
  );
};

export default SecondaryNavigation;



// add this for counts: <span className={'filter-count'}>{filter.countFilter} / {filter.countTotal}</span>



function useOnClickOutside(ref, handler) {
  
  useEffect(
    () => {
      
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          
          return;
        }
        
        handler(event);
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}