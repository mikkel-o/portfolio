import React, {useState} from "react";
import Project from "../../components/Project";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearId } from "../singleProject/singleProjectSlice";





const AllProjects = (props) => {
  
const dispatch = useDispatch();
const selectedId = useSelector(state => state.singleProject.id);

console.log(selectedId);
  const transition = {duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}

  
    

  const onClickHandlerClose = (event, id) => { 
    
    dispatch(clearId());
    
    
  }
  



 /* const [searchParams] = useSearchParams();
  const filters = searchParams.get("filters"); // "1234"
  const queryFilters = filters ? filters.split(',') : [];
  console.log(queryFilters);
*/
const [isActive, setIsActive] = useState(-1);
  const allProjects = props.projects;
  const queryParams = props.params;
  /*const { isLoading } = props.projects;;
  if (isLoading) {
    return <Spinner />;
  }*/

  const list = allProjects.map((project, i) => (
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
        //transition: transition
        transition: {
          ease: [0.43, 0.13, 0.23, 0.96],
          duration: .4,
          delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
        }
      }
      
    }

  ));
console.log(isActive);
//const params = props.params;


const onClickHandler = (event, i) => { 
  
  setIsActive(i);

}


  return (
    <motion.div className="projects-container" 
    initial={'initial'} 
    animate={'animate'} 
    exit={'exit'} 
    transition={{transition}} 
   
   >

      {allProjects.map((project, i) => (
        <motion.div  
       variants={list[i]}

        key={project.id} onClick={event => onClickHandler(event, i)}>
        <Project project={project} key={i} params={queryParams}>
          
        </Project>
        </motion.div>
      ))}

  

    <motion.div className={selectedId.length !== 0 ? 'video-popup-wrapper video-popup-wrapper-zindex' : 'video-popup-wrapper' }>
    {selectedId.length !== 0 && (    
      <motion.div className={'video-popup'} layoutId={selectedId} transition={{ duration: .5, ease: [0.43, 0.23, 0.63, 0.96]}}>
      <motion.button className={'video-popup-close-btn'} onClick={onClickHandlerClose}>x</motion.button>
      
      <motion.div  className="video-wrapper" >
      <iframe 
        title="vimeo"
        src=""
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        className={'video-iframe'}>
      </iframe>
      </motion.div>
    
      
      </motion.div>
      
      )}
      
      <motion.div className={selectedId.length !== 0 ? 'video-popup-wrapper-bg video-popup-wrapper-bg-fade' : 'video-popup-wrapper-bg'} onClick={onClickHandlerClose}></motion.div>
      </motion.div>
      
  
  </motion.div>

  );
};

export default AllProjects;


//, staggerChildren: 0.05

//src="https://player.vimeo.com/video/90283590?h=ee7845b7cb&title=0&byline=0&portrait=0"