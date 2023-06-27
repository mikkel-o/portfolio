import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearId } from "../../features/singleProject/singleProjectSlice";
import { Tweet } from 'react-twitter-widgets';
import CircularProgress from '@mui/material/CircularProgress';


export function VideoModal(props) {
    const dispatch = useDispatch();
  const selectedHost = useSelector(state => state.singleProject.link.host);
  const selectedId = useSelector(state => state.singleProject.id);
  const selectedLink = useSelector(state => state.singleProject.link.link);
  
  
  
  
  const onClickHandlerClose = (event, id) => {   
    dispatch(clearId());
  }

    return (
<motion.div className={selectedId.length !== 0 ? 'video-popup-wrapper video-popup-wrapper-zindex' : 'video-popup-wrapper' }>
        {/*layoutId={selectedId}  */}
        {selectedId.length !== 0 && (    
          <motion.div 
            className={'video-popup'} 
            layoutId={selectedId}
            transition={{ duration: .3, ease: [0.43, 0.23, 0.63, 0.96]}}
          >
            <motion.div className="video-wrapper" >
            <CircularProgress className={'spinner'}/>
            
            {selectedHost === 'twitter' ? 
              <Tweet tweetId="1013818096186986496" />
            :
              <iframe 
                title="vimeo"
                src={selectedLink}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={'video-iframe'}>
              </iframe>
            }

            </motion.div>
          </motion.div>
        )}
        <motion.div 
          className={selectedId.length !== 0 ? 'video-popup-wrapper-bg video-popup-wrapper-bg-fade' : 'video-popup-wrapper-bg'} 
          onClick={onClickHandlerClose}>
        </motion.div>
      </motion.div>
    );    
};