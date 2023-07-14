import React from "react";
import { VideoModal } from '../VideoModal/VideoModal';
import { AlbumContainer} from "./AlbumContainer";
import { AlbumCard} from "./AlbumCard";
import { AlbumCardOverlay} from "./AlbumCardOverlay";
import './Album.css';
import { useSelector } from "react-redux";
  

export function Album(props) {
  const {items, allItems, filters, type, overlay, layout, scroll } = props;
   


const itemInView = useSelector(state => state.projects.selectedID);
const layoutGrid = useSelector(state => state.toggle.layout);
console.log(itemInView);


  return (
    <>
    
    
        <AlbumContainer scroll={scroll} layout={layout}>
          {items.map((item, i) => (
          <>
            <AlbumCard item={item} index={i} key={item.id} filters={filters} allItems={allItems} type={type} scroll={scroll} layout={layout}> 
              {
                overlay ? 
                  <AlbumCardOverlay item={item} key={item.id + 44} filters={filters} layoutGrid={layoutGrid} overlay={overlay}/> 
                : 
                  null
              }
            </AlbumCard>
            </>
          ))}
           {
           layoutGrid === 0 ?
            items.map((item, i) => (
              overlay && itemInView.id === item.id ? 
            
            <div key={item.id + 55} className={"test"}>
              <div className={"album__title-wrapper album__title-wrapper--scroll"}>
    <h2 className="album__overlay-title album__overlay-title--scroll">{item.album ? item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].title : item.title ? item.title : ""}</h2>
    <h3 className="album__overlay-subtitle album__overlay-subtitle--scroll">{item.role ? item.role.map(element => element).join(' | ') : ""}</h3> 
    </div>
            </div>
            : 
            null
            
            ))
            :
            null
            }
          <VideoModal/>
      </AlbumContainer>
      </>
  );
};

