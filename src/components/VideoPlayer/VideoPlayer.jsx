import React, {useState, useRef, useEffect} from "react";
//import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import './VideoPlayer.css';





export default function VideoEmbed(props) {
    const {host, id, position, posterVid, posterImg, playText} = props;
    
    const [isActive, setIsActive] = useState(false);
//const [isActiveHasBeenSet, setIsActiveHasBeenSet] = useState(false);
const [isIntersecting, setIsIntersecting] = useState(false);

    //const startingCoord = useSelector(state => state.singleProject.coord);
  //const duration = .5;
  const ease = [.33, .13, .63, .96];
  const ref = useRef();
  
  
const button = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      ease: ease,
      duration: .5,
      delay: 1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ease: [0.66, 0.43, 0.53, 0.96],
      duration: .6
    }
  }
}



useEffect(() => {
  const observer = new IntersectionObserver(
    
    ([entry]) => { 
      
        setIsIntersecting(entry.isIntersecting);
    },
    {
      rootMargin: "0px",
      threshold: 0
    }
  );
  if (!isIntersecting && isActive) {
    setIsActive(false)
    const video = ref.current.children[0].children[0];
        video.src = "";
  } 
  
  
    
      observer.observe(ref.current);
    

  }, [ref, isActive, isIntersecting]); 


      const onClickHandler = (event) => { 
        setIsActive(true);
        //setIsActiveHasBeenSet(true);
        const video = event.target.previousElementSibling;
        video.src = video.dataset.src;
      }
    return (
      
      <div
        ref={ref} 
        className={'video-embed__wrapper'}
      >
        {host === 'youtube' ?
        <youtube-embed>
           {!isActive ? 
           <motion.video 
            loading="lazy" 
            
            className={`
              album__image 
              project-single-image 
              album__image--position-${position}
            `} 
            
            src={posterVid} 
            poster={posterImg}
            loop
            autoPlay={1}
            playsInline
            muted
            alt="Video Description"
          >
          </motion.video>
          : null}
          <motion.iframe 
            title="youtube-iframe" 
            allow="autoplay" 
            src="" 
            data-src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
            
          ></motion.iframe>
          {playText ?
          <motion.button 
          aria-label="Play video" 
          onClick={event => onClickHandler(event)}
          variants={button}
        >
          <motion.h3 
              aria-label="Play video" 
              onClick={event => onClickHandler(event)}
              variants={button}
            >
              {playText}
            </motion.h3>
        </motion.button>
            

          : <motion.button 
          aria-label="Play video" 
          onClick={event => onClickHandler(event)}
          variants={button}
        ></motion.button>}
          </youtube-embed>
        
        :
        
        host === 'vimeo' ?
        <vimeo-embed>



          {!isActive ? 
          <motion.video 
            loading="lazy" 
            
            className={`
              album__image 
              project-single-image 
              album__image--position-${position}
            `} 
            
            src={posterVid} 
            poster={posterImg}
            loop
            autoPlay={1}
            playsInline
            muted
            alt="Video Description"
          ></motion.video>
          : null}
          <motion.iframe 
            title="vimeo-iframe" 
            allow="autoplay" 
            src="" 
            data-src={`https://player.vimeo.com/video/${id}&autoplay=1&muted=1`}
           
          ></motion.iframe>
          
         <motion.button 
          aria-label="Play video" 
          onClick={event => onClickHandler(event)}
          variants={button}
        ></motion.button>
        {playText && !isActive ?
        
           <motion.h3 
                 aria-label="Play video" 
                 
                 variants={button}
               >
                 {playText}
               </motion.h3>
               
        : null }
        </vimeo-embed>
        :
        host === 'dailymotion' ?
        <dailymotion-embed>



          {!isActive ? 
          <motion.video 
            loading="lazy" 
            
            className={`
              album__image 
              project-single-image 
              album__image--position-${position}
            `} 
            
            src={posterVid} 
            poster={posterImg}
            loop
            autoPlay={1}
            playsInline
            muted
            alt="Video Description"
          ></motion.video>
          : null}
          <motion.iframe 
            title="dailymotion-iframe" 
            allow="autoplay" 
            src="" 
            data-src={`https://www.dailymotion.com/embed/video/${id}?autoplay=1&mute=1`}
           
          ></motion.iframe>
          
         <motion.button 
          aria-label="Play video" 
          onClick={event => onClickHandler(event)}
          variants={button}
        ></motion.button>
        {playText && !isActive ?
        
           <motion.h3 
                 aria-label="Play video" 
                 
                 variants={button}
               >
                 {playText}
               </motion.h3>
               
        : null }
        </dailymotion-embed>
        :
        null
        }
      </div>
    )

}