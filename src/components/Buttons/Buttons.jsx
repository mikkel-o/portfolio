import React, { useState, useRef, useEffect  } from "react";
import Icon from "../Icons/Icon";
import './Buttons.css';
import {useDispatch, useSelector} from "react-redux"
import { layout } from "../toggleSlice";

export function MoreButton() {
  return (  
        <button className={'btn__more'}>
          <span className={'span-one'}></span>
          <span className={'span-two'}></span>
          <span className={'span-three'}>more</span>
    </button>
  );
};

export function PlayButton() {
    return (  
      <button className={'btn__play'}>
      <span className={'span-one'}></span>
      <span className={'span-two'}></span>
      <span className={'span-three'}>play</span>
    </button>
    );
  };


  export function LayoutToggleButton() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const layoutIsh = useSelector(state => state.toggle.layout);
    console.log(layoutIsh);
    const onClickHandler = (event) => { 
      setIsOpen(!isOpen);
    }
    const onClickBtnHandler = (event, number) => { 
      console.log(number);
      dispatch(layout(number));
      console.log(layoutIsh);
      setIsOpen(false);
    }
    const ref = useRef();

    useOnClickOutside(ref, () => {setIsOpen(false)}); // Detect click outside filters box (try and put in seperat hook so it can be reused)
    
    return (  
    <div ref={ref}>
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
    </div>
    );
  };





function useOnClickOutside(ref, handler) {
  
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          
          return;
        }
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