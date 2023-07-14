import React from "react";
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
