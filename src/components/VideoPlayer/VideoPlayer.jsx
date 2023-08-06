import React, {useState, useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import './VideoPlayer.css';





export default function VideoEmbed(props) {
    const {project} = props;
    const [isActive, setIsActive] = useState(false);
const [isActiveHasBeenSet, setIsActiveHasBeenSet] = useState(false);
const [isIntersecting, setIsIntersecting] = useState(false);

    const startingCoord = useSelector(state => state.singleProject.coord);
  const duration = .5;
  const ease = [.33, .13, .63, .96];
  const ref = useRef();
  const variants = {
    initial: {
      y: startingCoord[1],
      x: startingCoord[0],
      width: startingCoord[2],
      height: startingCoord[3],
    },
    animate: {
      y:  0, 
      x:  -20, 
      width: 'calc(100% + 40px)',
      height: '50vh',
      transition: {
        ease: ease,
        duration,
        width: {
          delay: .5,
          duration: .7
        },
        x: {
          delay: .5,
          duration: .7
        },
      }
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        ease: [0.66, 0.43, 0.53, 0.96],
        duration: .6,
        delay:.2
    }
    }
  }
  const variantsTwo = {
    initial: {
      
    },
    animate: {
      y:  0, 
      x:  -20, 
      width: 'calc(100% + 40px)',
      height: '50vh',
      transition: {
        ease: ease,
        duration,
        width: {
          delay: .5,
          duration: .7
        },
        x: {
          delay: .5,
          duration: .7
        },
      }
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        ease: [0.66, 0.43, 0.53, 0.96],
        duration: .6,
        delay:.2
    }
    }
  }
  
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
      console.log(ref.current);
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
        setIsActiveHasBeenSet(true);
        const video = event.target.previousElementSibling;
        video.src = video.dataset.src;
      }
    return (
      
      <div
        ref={ref} 
        className={'video-embed__wrapper'}
      >
        {project.embed.host === 'youtube' ?
        <youtube-embed>
           {!isActive ? 
           <motion.video 
            loading="lazy" 
            
            className={`
              album__image 
              project-single-image 
              album__image--position-${project.position}
            `} 
            variants={!isActiveHasBeenSet ? variants : variantsTwo}
            src={project.vid} 
            poster={project.img}
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
            data-src={`https://www.youtube.com/embed/${project.embed.id}?autoplay=1&mute=1`}
            variants={!isActiveHasBeenSet ? variants : variantsTwo}
          ></motion.iframe>
          
          <motion.button 
            aria-label="Play video" 
            onClick={event => onClickHandler(event)}
            variants={button}
          ></motion.button>
        </youtube-embed>
        
        :
        
        project.embed.host === 'vimeo' ?
        <vimeo-embed>
          {!isActive ? 
          <motion.video 
            loading="lazy" 
            
            className={`
              album__image 
              project-single-image 
              album__image--position-${project.position}
            `} 
            variants={!isActiveHasBeenSet ? variants : variantsTwo}
            src={project.vid} 
            poster={project.img}
            loop
            autoPlay={1}
            playsInline
            muted
            alt="Video Description"
          ></motion.video>
          : null}
          <motion.iframe 
            title="youtube-iframe" 
            allow="autoplay" 
            src="" 
            data-src={`https://player.vimeo.com/video/${project.embed.id}?h=047afc0e35&autoplay=1&muted=1`}
            variants={!isActiveHasBeenSet ? variants : variantsTwo}
          ></motion.iframe>
          
          <motion.button 
            aria-label="Play video" 
            onClick={event => onClickHandler(event)}
            variants={button}
          ></motion.button>
        </vimeo-embed>
        :
        null
        }
      </div>
    )

}