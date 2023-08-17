import React from 'react';
import { useSelector } from "react-redux";
import { Projects } from "../../features/projects/Projects";
import Filters from "../../features/filters/Filters";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { motion } from 'framer-motion';


export default function ProjectsAll() {
  const allProjects = useSelector(state => state.projects.all).length;
  //const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  const filtersAll = useSelector(state => state.projects.filters.all);
  const filtersActive =  useSelector(state => state.projects.filters.active);
  const filtersPseudo = useSelector(state => state.projects.filters.pseudo);
  //const layout = useSelector(state => state.toggle.layout);
  const transition = {duration: .2, ease: [0.66, 0.43, 0.53, 0.96]}
  



  return (
    
    <motion.div className={'wrapper'} >
      {filtersActive.length === 0 ? 
      <motion.div 
        className={'video-player__wrapper'}
        
        initial={{
          opacity: 0,
          transition: transition
        }} 

        animate={{
          opacity: 1,
          height: '50vh',
          transition: {
            ease: [0.66, 0.43, 0.53, 0.96],
            duration: .5,
          }
          }} 
        exit={{
          opacity: 0,
          transition: transition
          }}
      >
        
      
        <VideoPlayer 
        posterVid={'https://player.vimeo.com/progressive_redirect/playback/848542892/rendition/720p/file.mp4?loc=external&signature=8c74ef7b728d3833b55001734f2040c80f0348de790e76e83ca66a55edbdb704'} 
        posterImg={'/video/CGReel_temp_poster_540.jpg'} 
        host={'vimeo'} 
        id={'767311875?h=38e18a53c8'}
        transition={"opacity"}
        playText={"CG Showreel"}
      ></VideoPlayer>
      
      </motion.div>
      :
      null}
      
      <Filters filtersAll={filtersAll} filtersActive={filtersActive} filtersPseudo={filtersPseudo} type={"work"}/>
      <main id="projects-wrapper">
        <section className="projects-section">
          
          {allProjects !== 0 ?
            <Projects/>
            : 
            null
          }
        </section>
      </main>
      
    </motion.div>
  );
}