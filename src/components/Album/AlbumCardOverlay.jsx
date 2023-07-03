import React from "react";

export function AlbumCardOverlay(props) {
  const {item } = props; 


  return (  
    <>
    <div className={'album__overlay album__overlay--scroll'}>
    
    <div className={"album__title-wrapper album__title-wrapper--scroll"}>
    <h2 className="album__overlay-title album__overlay-title--scroll">{item.album ? item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].title : item.title ? item.title : ""}</h2>
    <h3 className="album__overlay-subtitle album__overlay-subtitle--scroll">{item.role ? item.role.map(element => element).join(' | ') : ""}</h3> 
    </div>
    
    <div className={'album__overlay-bg album__overlay-bg--scroll'}></div>
    </div>
    
    </>
  );
};





