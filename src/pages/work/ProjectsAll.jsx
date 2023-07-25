import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Projects } from "../../features/projects/Projects";
import Filters from "../../features/filters/Filters";
import { motion } from "framer-motion";
import { toggle } from "../../components/toggleSlice";
import { hideAllToggles} from "../../components/toggleSlice";


function useOnClickOutside(ref, handler) {
  
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target) || event.target.classList.contains('projects-play-btn') || event.target.classList.contains('carousel__btn') || event.target.classList.contains('carousel__dot-item') || event.target.classList.contains('projects-more-btn')) {
          
          return;
        } else {
          
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
  
  const ref = useRef();
  //const [isIntersecting, setIsIntersecting] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.toggle)['showreel'];
  const onClickHandler = (event) => { 
    
    dispatch(toggle('showreel'));
    
  }
  useOnClickOutside(ref, () => {dispatch(hideAllToggles('showreel'));}); 
  

  /*
  useEffect(() => {
    const observer = new IntersectionObserver(
      
      ([entry]) => { 
        console.log('intersection running');
          setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0
      }
    );
    if (isIntersecting) {
      console.log(ref.current);
      
    } 
    
    
      observer.observe(ref.current);
  
    }, [ref, isIntersecting]);  
*/
  



  
  return (
    <motion.div 
    className="featured-projects-container"
    
    onClick={onClickHandler}
    key={'blue'}
    initial={{opacity: 0, scale: 0.95}}
    animate={{opacity: 1, scale: 1, height: isOpen ? 'calc(100vh - 80px)' : '250px', transition: {ease: [.43, .13, .23, .96], duration: .6}}}
    exit={{opacity: 0, scale: 1.03 }}
    
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
              
              
      
                  
                  
                  <div className={'showreel carousel__wrapper'}>
        
     
                  {/* video/image container */}
                  <ul className={'carousel__list project'}>
                    <li className={'carousel__item carousel__item--featured current-slide' }>
            
            
                        {/* video (!add image posibility) 
                        <img alt={'showreel-poster'} className={'carousel__video'} src={'/video/CGReel_temp_poster_540.jpg'}/>
                        */}
                          <video 
                          ref={ref}
                      className={'album__video carousel__video'}
                      src={"https://player.vimeo.com/progressive_redirect/playback/848542892/rendition/720p/file.mp4?loc=external&signature=8c74ef7b728d3833b55001734f2040c80f0348de790e76e83ca66a55edbdb704"} 
                      poster={'/video/CGReel_temp_poster_540.jpg'}
                      loop
                      autoPlay={1}
                      playsInline
                      muted
                    
                    ></video>
                        
                      
                      
                    
                    {/* END .carousel__item */}
                    </li> 
                  {/* END .carousel__list */}  
                  </ul>
                  </div>
                 


                  <motion.span 
                    className={"project-container"} 
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                  >
                    
                    
                    
                    <motion.div 
                      exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} 
                      className={'project-info-bg'} 
                      style={{zIndex: 4}} 
                      onClick={onClickHandler}
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
                    </motion.div>
                    
                    </motion.span>




                  
              


                
              
              </span>   
      
    </motion.div>





  );
};


export default function ProjectsAll() {
  
  const allProjects = useSelector(state => state.projects.all).length;
  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];

  const filtersAll = useSelector(state => state.projects.filters.all);
  const filtersActive =  useSelector(state => state.projects.filters.active);
  const filtersPseudo = useSelector(state => state.projects.filters.pseudo);
  
  
  return (
    <div className={'wrapper'}>


<FeaturedProjects></FeaturedProjects>
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
        <Filters filtersAll={filtersAll} filtersActive={filtersActive} filtersPseudo={filtersPseudo} type={"work"}/>
      </header>
      <main id="projects-wrapper">
        <section className="projects-section">
          
          {allProjects !== 0 ?
            <Projects/>
            : 
            null
          }
        </section>
      </main>
    </div>
  );
}