import React from "react";
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

    
    return (  
      <div className={'bnt__layout-wrapper'}>
     <button className={'btn__layout'}>
    <Icon name={'layout-full-solid'} size={25} color={''}></Icon>
    </button>
    <button className={'btn__layout'}>
    <Icon name={'layout-one-solid'} size={25} color={''}></Icon>
    </button>
    <button className={'btn__layout'}>
    <Icon name={'layout-two-solid'} size={25} color={''}></Icon>
    </button>
    <button className={'btn__layout'}>
    <Icon name={'layout-three-solid'} size={25} color={''}></Icon>
    </button>
    </div>
    );
  };


