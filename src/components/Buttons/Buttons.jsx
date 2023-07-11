import React, { useState } from "react";
import Icon from "../Icons/Icon";
import './Buttons.css';




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
    const onClickHandler = (event) => { 
      setIsOpen(!isOpen);
    }
    
    return (  
    <>
     <button 
      className={'btn__layout--toggle btn__layout btn__layout--active'}
      onClick={event => onClickHandler(event)}
      >
    <Icon name={'layout-full-solid'} size={26} color={''}></Icon>
    </button>
    
    <div className={`bnt__layout-wrapper ${isOpen ? 'bnt__layout-wrapper--active' : ''}` }>
    
    <button className={'btn__layout'}>
    <Icon name={'layout-full-solid'} size={26} color={''}></Icon>
    </button>
    <button className={'btn__layout'}>
    <Icon name={'layout-one-solid'} size={28} color={''}></Icon>
    </button>
    <button className={'btn__layout'}>
    <Icon name={'layout-two-solid'} size={28} color={''}></Icon>
    </button>
    <button className={'btn__layout'}>
    <Icon name={'layout-three-solid'} size={28} color={''}></Icon>
    </button>
    </div>
    </>
    );
  };


