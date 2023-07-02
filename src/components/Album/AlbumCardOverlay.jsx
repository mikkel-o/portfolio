import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {MoreButton, PlayButton} from "../Buttons/Buttons";
import { 
  addProject, 
  clearProjects, 
  projectCoord, 
  addId, 
  clearId, 
  addLink, 
  clearLink } from "../../features/singleProject/singleProjectSlice";

export function AlbumCardOverlay(props) {
  const {item, filters } = props; 
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  const onClickyHandler = (event) => { 
    setIsOpen(!isOpen);
    const childPos = event.target.parentElement.parentElement.parentElement.getBoundingClientRect();
    const index = [...event.target.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);
    const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];
    dispatch(clearProjects());
    dispatch(addProject(item));
    dispatch(projectCoord(coord));
  }
  
  const onClickHandlerPlay = (event, activeFilmIndex) => { 
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
    
    <div className={"album__title-wrapper album__title-wrapper--scroll"}>
    <h2 className="album__overlay-title album__overlay-title--scroll">{item.album ? item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].title : item.title ? item.title : ""}</h2>
    <h3 className="album__overlay-subtitle album__overlay-subtitle--scroll">{item.role ? item.role.map(element => element).join(' | ') : ""}</h3> 
    </div>
    <div className={"album__overlay-wrapper album__overlay-wrapper--scroll"}>
      <Link 
        to={
            item.album ? 
              `/work/${item.name}/${item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`
            :
              `/work/${item.name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`
            } 
        onClick={onClickyHandler}
      >
        <MoreButton/>
      </Link>
      
      <div onClick={event => onClickHandlerPlay(event, item.activeFilmIndex ? item.activeFilmIndex : 0)}>
        <PlayButton/>
      </div>
      
      
    </div>
    <div className={'album__overlay-bg album__overlay-bg--scroll'}></div>
    </div>
    </>
  );
};





