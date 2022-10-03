import React, {useState} from "react";
import Project from "../../components/Project";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearId } from "../singleProject/singleProjectSlice";

const transition = {duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}

const Projects = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(state => state.singleProject.id);
  const selectedLink = useSelector(state => state.singleProject.link);
  const allProjects = useSelector(state => state.projects.all);
  const activeProjects = useSelector(state => state.projects.active);
  
  const [isActive, setIsActive] = useState(-1);
  const variants = allProjects.map((project, i) => (
    {
      initial: {
        opacity: 0,
        scale: .9,
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



  return (
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
          key={project.id} onClick={event => onClickHandler(event, i)}
        >
          <Project 
            project={project}
            key={i}>
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
              <iframe 
                title="vimeo"
                src={selectedLink}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={'video-iframe'}>
              </iframe>
             

            </motion.div>
          </motion.div>
        )}
        <motion.div 
          className={selectedId.length !== 0 ? 'video-popup-wrapper-bg video-popup-wrapper-bg-fade' : 'video-popup-wrapper-bg'} 
          onClick={onClickHandlerClose}>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;