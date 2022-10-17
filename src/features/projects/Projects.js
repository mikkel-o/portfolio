import React, {useState, useEffect, useRef, useMemo} from "react";
import Project from "../../components/Project";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearId } from "../singleProject/singleProjectSlice";
import { Tweet } from 'react-twitter-widgets';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import CircularProgress from '@mui/material/CircularProgress';
import { toggle } from "../../components/toggleSlice";
import { hideAllToggles} from "../../components/toggleSlice";
const transition = {duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

function useOnClickOutside(ref, handler) {
  
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target) || event.target.classList.contains('projects-play-btn') || event.target.classList.contains('carousel__btn') || event.target.classList.contains('carousel__dot-item') || event.target.classList.contains('projects-more-btn')) {
          console.log('should return');
          return;
        } else {
          console.log(event.target);
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export function FeaturedProjects() {
  const allFeaturedProjects = useSelector(state => state.projects.featured);
  const ref = useRef();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.toggle)['showreel'];
  const onClickHandler = (event) => { 
    dispatch(toggle('showreel'));
    
  }
  useOnClickOutside(ref, () => {dispatch(hideAllToggles('showreel'));}); 
  

  


  
  return (
    <motion.div 
    className="featured-projects-container"
    exit={{opacity: 0}}
    
    key={'blue'}
    animate={{height: isOpen ? 'calc(100vh - 80px)' : '540px', transition: {ease: [.43, .13, .23, .96], duration: .5}}}
    
    ref={ref}
    >
      {isOpen ? 

        <motion.div
          style={{
            position: "absolute", 
            top: 0, 
            left: 0,
            width: 'calc(100% - 30px)',
            marginLeft: '15px',
          height: '100%',
          background: 'black'
          }}
          
        >
           <iframe 
                title="vimeo"
                src={"https://player.vimeo.com/video/324923104?h=b4fd0913dc"}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={'video-iframe'}>
              </iframe>
        </motion.div>
        
        :
        null
      }
      <span className="project-container" >
              
              
                  
                  
                  <ImageSlider project={allFeaturedProjects} items={allFeaturedProjects.album} name={allFeaturedProjects.name} type={'feature'} showTitle={true}/> 
                  
                  {allFeaturedProjects.album[allFeaturedProjects.activeFilmIndex].name !== 'cg-showreel' ?
                    <motion.span className={"project-container"} >
                    <div className={'project-info'}>
                      
                      <Link 
                        to={`/projects/${allFeaturedProjects.name}/${allFeaturedProjects.album[allFeaturedProjects.activeFilmIndex ? allFeaturedProjects.activeFilmIndex : 0].name}`} 
                        
                      >
                        <button className={'projects-more-btn'}>
                          <span className={'span-one'}></span>
                          <span className={'span-two'}></span>
                          <span className={'span-three'}>more</span>
                        </button>
                      </Link>
                      <button className={'projects-play-btn'}>
                        <span className={'span-one'}></span>
                        <span className={'span-two'}></span>
                        <span className={'span-three'}>play</span>
                      </button>
                      
                    </div>
                    
                    <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg'}>
                    <h1 className={'featured-slide-title'}>{`${allFeaturedProjects.album[allFeaturedProjects.activeFilmIndex].title}`}</h1>
                    <h2 className={'featured-slide-role'}>{`${allFeaturedProjects.album[allFeaturedProjects.activeFilmIndex].featuredRole}`}</h2>
                    </motion.div>
                    <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg-bottom'}></motion.div>
                    </motion.span>
                  : 



                  <motion.span 
                    className={"project-container"} 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                  >
                    <motion.button
                      className={'showreel-play-btn'}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        zIndex: "50",
                        pointerEvents: 'none'
                      }}
                      
                      
                      >
                      <div 
                        style={{
                          borderRadius: "50%",
                          border: "0px solid white",
                          width: "100px",
                          height: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          zIndex: "50"
                        }}
                      >
                        <div
                          style={{
                            clipPath: "polygon(0% 0, 0% 100%, 100% 50%)",
                            width: "25px",
                            height: "30px",
                            position: "absolute",
                            left: "calc(50% - 8px)",
                            background: "white",
                            zIndex: "50"
                          }}
                        >

                        </div>
                      </div>
                    </motion.button>
                    <div className={'project-info'}>
                      
                      
                 
                      
                    </div>
                    
                    <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg'} style={{zIndex: 4}} onClick={onClickHandler}>
                    <h1 className={'featured-slide-title'}>{`${allFeaturedProjects.album[allFeaturedProjects.activeFilmIndex].title}`}</h1>
                    <h2 className={'featured-slide-role'}>{`${allFeaturedProjects.album[allFeaturedProjects.activeFilmIndex].featuredRole}`}</h2>
                    </motion.div>
                    <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg-bottom'}></motion.div>
                    </motion.span>




                  }
              


                
              
              </span>   
      
    </motion.div>





  );
};






  




export function Projects() {
  const dispatch = useDispatch();
  const selectedHost = useSelector(state => state.singleProject.link.host);
  const selectedId = useSelector(state => state.singleProject.id);
  const selectedLink = useSelector(state => state.singleProject.link.link);
  const ref = useRef();
  
  const allProjects = useSelector(state => state.projects.all);
  const activeProjects = useSelector(state => state.projects.active);
  
  const [isActive, setIsActive] = useState(-1);
  const variants = allProjects.map((project, i) => (
    {
      initial: {
        opacity: 0,
        scale: 0.9,
        transition: transition
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          ease: [0.43, 0.13, 0.23, 0.96],
          duration: .4,
          delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
        }
      },
      exit: isActive === i ? '' : 
      {
        opacity: 0,
        transition: {
          ease: [0.43, 0.13, 0.23, 0.96],
          duration: .4,
          delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
        }
      }
    }
  ));

  const onClickHandlerClose = (event, id) => {   
    dispatch(clearId());
  }
  const onClickHandler = (event, i) => { 
    setIsActive(i);
  }


  
  const isInViewport = useIsInViewport(ref);
  console.log(isInViewport);
  useEffect(()=> {
    if(isInViewport === false) {
      dispatch(hideAllToggles('showreel'))
    }
    
  },[dispatch, isInViewport])

  return (
    <div>
      <span className={'intersection'} style={{position: 'absolute', top: 'calc(100% - 80px)', left: 0, width: '0px', height: '0px'}} ref={ref}></span>
    <motion.div 
      className="projects-container" 
      initial={'initial'} 
      animate={'animate'} 
      exit={'exit'} 
      transition={{transition}} 
      
    >
      
      {activeProjects.map((project, i) => (
        <motion.div  
          variants={variants[i]}
          key={project.id} 
          onClick={event => onClickHandler(event, i)}
          
        >
          <Project 
            project={project}
            key={i}
            
            >
          </Project>
        </motion.div>
      ))}
      <motion.div className={selectedId.length !== 0 ? 'video-popup-wrapper video-popup-wrapper-zindex' : 'video-popup-wrapper' }>
        {/*layoutId={selectedId}  */}
        {selectedId.length !== 0 && (    
          <motion.div 
            className={'video-popup'} 
            layoutId={selectedId}
            transition={{ duration: .3, ease: [0.43, 0.23, 0.63, 0.96]}}
          >
            {/*<motion.button 
              className={'video-popup-close-btn'} 
              onClick={onClickHandlerClose}>
              x
            </motion.button>*/}
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
    </motion.div>
    </div>
  );
};

