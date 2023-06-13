import React from 'react';
import { useParams } from "react-router-dom";
import './PhotoAlbum.css';
import { useSelector, useDispatch } from "react-redux";
import PhotoCard from "../../components/PhotoCard";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { addActiveItem } from "../../features/photo/photoSlice";


export default function Album() {
  const params = useParams();
  const dispatch = useDispatch();
  const activeItem = useSelector(state => state.photo.activeItem);
  const photos = useSelector(state => state.photo);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: activeItem.orientation === 'vertical' ? 'auto' : '90vw',
    height: activeItem.orientation === 'vertical' ? '95vh' : 'auto',
    outline: 'none',
    border: 'none',
    boxShadow: 24,
  };
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event, single) => {
    console.log(single);
    dispatch(addActiveItem(single));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
    
console.log(activeItem);
const album = photos.all.find(
        
  (single) => single.title === params.PhotoAlbumTitle
);
console.log(album);

  return (
    <main className={'album album--photo'}>
      <ul className={'album__sub-list'}>
        
        {album ? album.album
          .map((single, i) => (
            <li onClick={event => handleOpen(event, (single))}
            className={
              single.orientation && single.orientation === 'vertical' && single.position && single.position === 'special' ? 
                `album__sub-item album__item--${i} album__item--${single.orientation} album__item--${single.position}` 
                :
                single.orientation && single.orientation === 'vertical' ? 
                    `album__sub-item album__item--${i} album__item--${single.orientation}` 
                    :
                    single.position && single.position === 'special' ? 
                      `album__sub-item album__item--${i} album__item--${single.position}` 
                      : 
                      `album__sub-item album__item--${i}`}
            key={i}
            >
              <PhotoCard singl={single} i={i} albu={album} key={i}></PhotoCard>
              </li>
            
            

          ))
        : null}
      </ul>
      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
               <Box sx={style}>
               {(activeItem.collection) ? <img alt={'blah'} src={activeItem.collection[0].thumbUrl} className={'modalView'}/> : activeItem.videoUrl ? <video  className={'modalView'} muted={true} autoPlay={true} loop={true} poster={activeItem.thumbUrl}><source src={activeItem.videoUrl} type={'video/mp4'}></source></video> : <img alt={'blah'} src={activeItem.thumbUrl} className={'modalView'}/>}
               
        </Box>
              </Modal>
    </main>
  );
}
