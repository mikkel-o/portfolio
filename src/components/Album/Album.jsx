import React from "react";
import { VideoModal } from '../VideoModal/VideoModal';
import { AlbumContainer} from "./AlbumContainer";
import { AlbumCard} from "./AlbumCard";
//import { AlbumCardOverlay} from "./AlbumCardOverlay";
import './Album.css';
//import { useSelector } from "react-redux";
import Icon from "../../components/Icons/Icon";  
import { layout } from "../../components/toggleSlice";
import {useDispatch, useSelector} from "react-redux"
import {MoreButton } from "../Buttons/Buttons";
import { 
  
  addId, 
  clearId, 
  addLink, 
  clearLink } from "../../features/singleProject/singleProjectSlice";


export function Album(props) {
  const {items, allItems, filters, type, scroll } = props;
  

const dispatch = useDispatch();
const itemInView = useSelector(state => state.projects.selectedID);
const lay = useSelector(state => state.toggle.layout);


const onClickHandler = (event, num) => { 
  dispatch(layout(num));
  
}




const onClickHandlerPlay = (event, itemInView, activeFilmIndex) => { 
  dispatch(clearId());
  dispatch(clearLink());
  dispatch(addId(itemInView.id));
  setTimeout(() => {
    itemInView.album ? dispatch(addLink(itemInView.album[activeFilmIndex].embed)) : dispatch(addLink(itemInView.embed));  
  }, "500")  
} 


  return (
    <>
    
     {
      lay === 0 ? 
      <button 
      className={'btn__layout'}
      onClick={event => onClickHandler(event, 3)}
      >
        <Icon name={'layout-three-solid'} size={26} color={'#fff'}></Icon> 
        </button>
      :
      lay === 3 ? 
      <button 
      className={'btn__layout'}
      onClick={event => onClickHandler(event, 0)}
      > 
      <Icon name={'layout-full-solid'} size={26} color={'#fff'}></Icon> 
        </button>
        : null }
     
    
    
        <AlbumContainer scroll={scroll} >
          {items.map((item, i) => (
          <>
            <AlbumCard layout={lay} item={item} index={i} key={item.id} filters={filters} allItems={allItems} type={type} scroll={scroll} > 
            {/*<AlbumCardOverlay layout={lay} item={item} key={item.id + 44} filters={filters}/>*/}
            </AlbumCard>
            
            </>
          ))}
          {type === 'work' ? 
            <div className={'album__overlay album__overlay--scroll'}>
              <div className={"test"}>
                <div className={"album__title-wrapper album__title-wrapper--scroll"}>
                  <h2 className="album__overlay-title album__overlay-title--scroll">{itemInView.title ? itemInView.title : ""}</h2>
                  <h3 className="album__overlay-subtitle album__overlay-subtitle--scroll">{itemInView.role ? itemInView.role.map(element => element).join(' | ') : ""}</h3> 
                </div>
              </div>
              <div className={"album__overlay-wrapper album__overlay-wrapper--scroll"}>
                <div onClick={event => onClickHandlerPlay(event, itemInView, itemInView.activeFilmIndex ? itemInView.activeFilmIndex : 0)}>
                    <MoreButton/>
                </div>
              </div>
            </div>
             :null}
          <VideoModal/>
      </AlbumContainer>
      </>
  );
};

