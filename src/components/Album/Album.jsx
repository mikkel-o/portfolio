import React from "react";
import { VideoModal } from '../VideoModal/VideoModal';
import { AlbumContainer} from "./AlbumContainer";
import { AlbumCard} from "./AlbumCard";
import { AlbumCardOverlay} from "./AlbumCardOverlay";
import './Album.css';
//import { useSelector } from "react-redux";
import Icon from "../../components/Icons/Icon";  
import { layout } from "../../components/toggleSlice";
import {useDispatch, useSelector} from "react-redux"

export function Album(props) {
  const {items, allItems, filters, type, scroll } = props;
  

const dispatch = useDispatch();
//const itemInView = useSelector(state => state.projects.selectedID);
const lay = useSelector(state => state.toggle.layout);


const onClickHandler = (event, num) => { 
  dispatch(layout(num));
  
}





  return (
    <>
    
     {
      lay === 0 ? 
      <button 
      className={'btn__layout'}
      onClick={event => onClickHandler(event, 3)}
      >
        <Icon name={'layout-three-solid'} size={26} color={''}></Icon> 
        </button>
      :
      lay === 3 ? 
      <button 
      className={'btn__layout'}
      onClick={event => onClickHandler(event, 0)}
      > 
      <Icon name={'layout-full-solid'} size={28} color={''}></Icon> 
        </button>
        : null }
     
    
    
        <AlbumContainer scroll={scroll} >
          {items.map((item, i) => (
          <>
            <AlbumCard layout={lay} item={item} index={i} key={item.id} filters={filters} allItems={allItems} type={type} scroll={scroll} > 
            {lay === 0 ? <AlbumCardOverlay item={item} key={item.id + 44} filters={filters}/>  : null}
            </AlbumCard>
            
            </>
          ))}
           
          <VideoModal/>
      </AlbumContainer>
      </>
  );
};

