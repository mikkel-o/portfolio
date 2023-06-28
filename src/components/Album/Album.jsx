import React from "react";
import { VideoModal } from '../VideoModal/VideoModal';
import { AlbumContainer} from "./AlbumContainer";
import { AlbumCard} from "./AlbumCard";
import { AlbumCardOverlay} from "./AlbumCardOverlay";
import './Album.css';


export function Album(props) {
  const {items, allItems, filters, type, overlay, layout, scroll } = props;

  return (
    <>
    <div className={"test"}></div>
        <AlbumContainer scroll={scroll} layout={layout}>
          {items.map((item, i) => (
            <AlbumCard item={item} index={i} key={item.id} allItems={allItems} type={type} scroll={scroll} layout={layout}> 
              {overlay ? <AlbumCardOverlay item={item} filters={filters}/> : null}
            </AlbumCard>
          ))}
          <VideoModal/>
      </AlbumContainer>
      </>
  );
};

