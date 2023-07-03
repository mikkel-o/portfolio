import React, { useState }  from "react";
import { VideoModal } from '../VideoModal/VideoModal';
import { AlbumContainer} from "./AlbumContainer";
import { AlbumCard} from "./AlbumCard";
import { AlbumCardOverlay} from "./AlbumCardOverlay";
import './Album.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {MoreButton, PlayButton} from "../Buttons/Buttons";
import { 
  addProject, 
  clearProjects, 
  projectCoord, 
  addId, 
  clearId, 
  addLink, 
  clearLink } from "../../features/singleProject/singleProjectSlice";

export function Album(props) {
  const {items, allItems, filters, type, overlay, layout, scroll } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  

  const onClickyHandler = (event, item) => { 
    setIsOpen(!isOpen);
    const childPos = event.target.parentElement.parentElement.parentElement.getBoundingClientRect();
    const index = [...event.target.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);
    const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];
    dispatch(clearProjects());
    dispatch(addProject(item));
    dispatch(projectCoord(coord));
  }
  
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
        <AlbumContainer scroll={scroll} layout={layout}>
          {items.map((item, i) => (
          <>
          <AlbumCard item={item} index={i} key={item.id} allItems={allItems} type={type} scroll={scroll} layout={layout}> 
              {overlay ? <AlbumCardOverlay item={item} key={item.id + 44} filters={filters}/> : null}
            </AlbumCard>
            <div key={item.id + 55} className={"test"}>
            {overlay ? 
            <div key={item.id + 66} className={"album__overlay-wrapper album__overlay-wrapper--scroll"}>
      <Link 
        to={
            item.album ? 
              `/work/${item.name}/${item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`
            :
              `/work/${item.name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`
            } 
        onClick={event => onClickyHandler(event, item)}
      >
        <MoreButton/>
      </Link>
      
      <div onClick={event => onClickHandlerPlay(event, item, item.activeFilmIndex ? item.activeFilmIndex : 0)}>
        <PlayButton/>
      </div>
      
      
    </div> : null}
          </div>
          </>
          ))}
          <VideoModal/>
      </AlbumContainer>
      </>
  );
};

