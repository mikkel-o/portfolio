import React from 'react';
import { 
  Link,
  Outlet
} from "react-router-dom";
import { useSelector } from "react-redux";
import './Photo.css';



export default function Photos() {
  const photos = useSelector(state => state.photo.all);
  
  return (
<main className={'album album--photo'}>
<Outlet />
      <ul className={'album__list'}>
        
      {photos.map((album, index) => (
        
            <li 
              key={`${index + 1}`}
              className={
                album.orientation && album.orientation === 'vertical' && album.position && album.position === 'special' ? 
                  `album__item album__item--${index + 1} album__item--${album.orientation} album__item--${album.position}` 
                  :
                  album.orientation && album.orientation === 'vertical' ? 
                      `album__item album__item--${index + 1} album__item--${album.orientation}` 
                      :
                      album.position && album.position === 'special' ? 
                        `album__item album__item--${index + 1} album__item--${album.position}` 
                        : 
                        `album__item album__item--${index + 1}`}
            > 
              
              
                    <Link to={`/photo/${album.title}`} className={'photo-album__link'}>
                      <img alt={'blah'} src={`${album.posterImg}`} className={'photo-album__img'} />
                    </Link>
              
            </li>
          ))}
      </ul>
      
    </main>




  );
}

