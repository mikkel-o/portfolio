import React from 'react';
import { 
  useParams
} from "react-router-dom";
import { useSelector } from "react-redux";

export default function Single() {
  const params = useParams();
  
  const photos = useSelector(state => state.photo);

  

    

const album = photos.all.find(
        
  (single) => single.title === params.PhotoAlbumTitle
);


  let single = album.album.find( (single) => single.title === params.PhotoCollectionTitle ),
      img = [],
      singo = single.collection.find( (singe) => singe.title === params.PhotoSingleTitle );
        
  img = <img alt={'blah'} src={singo.posterUrl} className={'single__img'}/>

  return (
        <div>
        {img}
        </div>
  );
}

