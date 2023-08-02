import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Projects } from "../../features/projects/Projects";
import Filters from "../../features/filters/Filters";
import { motion } from "framer-motion";



export function FeaturedProjects() {
  
  const ref = useRef();
  
  const [isActive, setIsActive] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  //const [isIntersecting, setIsIntersecting] = useState(false);
  //const dispatch = useDispatch();
  
  const onClickHandler = (event) => { 
    
    //dispatch(toggle('showreel'));
    setIsActive(true);
  }
  //useOnClickOutside(ref, () => {dispatch(hideAllToggles('showreel'))}); 
  
  
  
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
    if (!isIntersecting && isActive) {
      setIsActive(false)
      
    } 
    
    
      observer.observe(ref.current);
  
    }, [ref, isActive, isIntersecting]);  

  



  
  return (
    <motion.div 
    className="featured-projects-container"
    
    onClick={onClickHandler}
    key={'blue'}
    initial={{opacity: 0, scale: 0.95}}
    animate={{opacity: 1, scale: 1, transition: {ease: [.43, .13, .23, .96], duration: .6}}}
    exit={{opacity: 0, scale: 1.03 }}
    
    >
      {isActive ? 

        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
          height: '100%',
          background: 'black',
          zIndex: '25'
          }}
          
        >
           <iframe 
                title="vimeo"
                src={"https://player.vimeo.com/video/767311875?h=38e18a53c8&autoplay=1"}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                playsInline
                autoPlay
                className={'video-iframe'}
                onLoad={(event) => event.target.requestFullscreen()}
                
                >
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
                          className={'play__icon'}
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