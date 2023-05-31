import React from 'react';
import { 
  useLocation,
  useParams,
  NavLink,
  Link,
  Outlet
} from "react-router-dom";
import { useSelector } from "react-redux";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// https://www.npmjs.com/package/react-full-screen

export default function Collection() {
  let prev, next, collection, totalImages, index, img = [];
  const params = useParams();
  const handle = useFullScreenHandle(),
        htmlBody = document.querySelectorAll('body'),
        handleClick = () => { htmlBody[0].classList.remove('hide') };
        const photos = useSelector(state => state.photo);

        const album = photos.hasBeenSet ? photos.all.find(
                
          (single) => single.title === params.PhotoAlbumTitle
        ) : null; 
  if (photos.hasBeenSet) {
  let single = album.album.find( (single) => single.title === params.PhotoCollectionTitle );
      totalImages = album.album.length;
      index = album.album.findIndex(object => { return object.title === single.title; });
      
      
  if (index < 1) {
    prev = album.album[(album.album.length - 1)];
    next = album.album[index + 1];
  } else if (index === (album.album.length - 1)) {
    next = album.album[0];
    prev = album.album[index - 1];
  } else {
    prev = album.album[index - 1];
    next = album.album[index + 1];
  }

  if (single.collection) {
    single.collection.forEach((image, i) => {
      img.push(
        <QueryNavLink key={i} className={'collection__link'} to={`/photo/${album.title}/${single.title}/${image.title}`}> 
          <img alt={'blah'} src={image.thumbUrl} className={'collection__img'}/>
        </QueryNavLink>
      );
      collection = true;
    });
  } else {
      img = <img alt={'blah'} src={single.posterUrl} className={'single__img'}/>
      collection = false;
  }
  
  htmlBody[0].classList.add('hide');   
}
  return (
    <div>
      {photos.hasBeenSet ? 
    <div className={'single'} >
      <Link to={prev.collection ? '/photo/' + album.title + '/' + prev.title + '/' + prev.collection[0].title : '/photo/' + album.title + '/' + prev.title } className={'single__left-arrow-link'}>
        <button className={'single__left-arrow left-arrow'}></button>
      </Link>
      <Link to={`/photo/${album.title}`} onClick={handleClick}>
        <button className={'exit'}>
          <img alt={'blah'} src={'/icons/cross.png'} />
        </button>
      </Link>
      <div className={'single__wrapper single__wrapper--' + (collection ? 'collection' : '')}>  
        <FullScreen handle={handle}>
          <Outlet/>  
          <div className={collection ? 'collection__thumb-nav' : ''}  >
            {img}
          </div>
        </FullScreen>
        <div className={'fullscreen__button-wrapper'}>
          <button className={'fullscreen__button'} onClick={handle.enter}>
            <FullscreenIcon className={'fullscreen__icon'}></FullscreenIcon>
          </button>
        </div>
      </div>
      <div>
      </div>
      <Link to={next.collection ? '/photo/' + album.title + '/' + next.title + '/' + next.collection[0].title : '/photo/' + album.title + '/' + next.title } className={'single__right-arrow-link'}>
        <button className={'single__right-arrow right-arrow'}></button>
      </Link>
        <span className={'single__img-counter img-counter'}>{index + 1} / {totalImages}</span>
    </div>
: null}
</div>
  );
}

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}