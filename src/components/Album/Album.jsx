import React from "react";
import { VideoModal } from '../VideoModal/VideoModal';
import { AlbumContainer} from "./AlbumContainer";
import { AlbumCard} from "./AlbumCard";
import { AlbumCardOverlay} from "./AlbumCardOverlay";
import './Album.css';
import { useSelector } from "react-redux";
  

export function Album(props) {
  const {items, allItems, filters, type, overlay, layout, scroll } = props;
   


//const itemInView = useSelector(state => state.projects.selectedID);
const layoutGrid = useSelector(state => state.toggle.layout);






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
        
          <VideoModal/>
      </AlbumContainer>
      </>
  );
};

