import React from "react";
import { useDispatch } from "react-redux";
import {PlayButton } from "../Buttons/Buttons";
import { 
  
  addId, 
  clearId, 
  addLink, 
  clearLink } from "../../features/singleProject/singleProjectSlice";


export function AlbumCardOverlay(props) {
  const {layoutGrid, item, overlay } = props;
  const dispatch = useDispatch();


  const onClickHandlerPlay = (event, item, activeFilmIndex) => { 
    dispatch(clearId());
    dispatch(clearLink());
    dispatch(addId(item.id));
    setTimeout(() => {
      item.album ? dispatch(addLink(item.album[activeFilmIndex].embed)) : dispatch(addLink(item.embed));  
    }, "500")  
  } 

  return (  
    <>
    <div className={'album__overlay album__overlay--scroll'}>
      <div className={'album__overlay-bg album__overlay-bg--scroll'}></div>
    {
           layoutGrid !== 0 ?
            
              
      
            <div key={item.id + 55} className={"test"}>
              <div className={"album__title-wrapper album__title-wrapper--scroll"}>
                <h2 className="album__overlay-title album__overlay-title--scroll">{item.album ? item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].title : item.title ? item.title : ""}</h2>
                <h3 className="album__overlay-subtitle album__overlay-subtitle--scroll">{item.role ? item.role.map(element => element).join(' | ') : ""}</h3> 
              </div>
            {
              overlay ? 
                <div key={item.id + 66} className={"album__overlay-wrapper album__overlay-wrapper--scroll"}>
                  
                  <div onClick={event => onClickHandlerPlay(event, item, item.activeFilmIndex ? item.activeFilmIndex : 0)}>
                    <PlayButton/>
                  </div>
                </div> 
              : 
                null
            }
            </div>
            :
            null
          }
            
            
            
      </div>        
    
    
    </>
  );
};





