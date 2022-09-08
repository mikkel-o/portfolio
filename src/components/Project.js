import React, {useState} from "react";
import { 
  Link
} from "react-router-dom";
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { addProject, clearProjects, projectCoord } from "../features/singleProject/singleProjectSlice";

const transitionOne = {duration: .2, ease: [0.43, 0.13, 0.23, 0.96]}

const transitionExit = {duration: 0.2, delay: 0.2, ease: [0.3, 0.13, 0.13, 0.96]}
const transitionExitTwo = {duration: 0.5, ease: [0.1, 0.13, 0.13, 0.96]}



const infoMotion = {
  rest: {
    opacity: 1,
    transition: transitionOne
  },
  animate: {
    opacity: 1,
    transition: transitionOne
  },
  exit: {
    opacity: 0,
    transition: transitionExit
  },
  exitStay: {
    opacity: 0,

    transition: transitionExit
  }
  
};

const imgMotion = {
  animate: {
    opacity: 0,
    transition: transitionOne
  },
  exit: {
    opacity: 0,
    transition: transitionExitTwo
  },
  exitStay: {
    opacity: 1,
    transition: transitionExit
  }
};




export default function Project({project, params, children}) {
  const dispatch = useDispatch();
  //const project = props.project;
  
  //const params = props.params;
  const [isOpen, setIsOpen] = useState(false)

const onClickHandler = (event) => { 
  setIsOpen(!isOpen);

  
  const childPos = event.target.parentElement.parentElement.parentElement.getBoundingClientRect();
  
  
  const index = [...event.target.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);

  

  

  const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];

  dispatch(clearProjects());
  dispatch(addProject(project));
  dispatch(projectCoord(coord));

}


function onTap(event, info) {
  //coord = [event.target.getBoundingClientRect().x, event.target.getBoundingClientRect().y ];

}

function onPan(event, info) {

  event.target.focus();
}



//whileHover={"hover"} FIX the hover it cause weird animation break on exiting the page

return (
  <motion.div className={''} variants={infoMotion}>
      <Link  to={`/projects/${project.name}?filters=${params.map(e => e + '%2C')}`} onClick={onClickHandler}>
      <motion.div className="">
    <motion.div 
      key={project.id} 
      className="project" 
      initial={'rest'} 
      whileFocus={"hover"} 
      onPan={onPan} 
      onTap={onTap} 
      

      animate={'rest'} 
      
      tabIndex={project.id} 
      transition={{staggerChildren: 0.05}}

      exit={isOpen ? 'exitStay' : 'exit'} 
    >
      <span className="project-container" >
        <motion.img variants={imgMotion} src={project.img} alt="" className="project-image" />
       
     
          
 <motion.div className={'project-info'} variants={infoMotion}>
        
        <motion.h2 className="project-name">{project.name}</motion.h2>
        
        
        <motion.h3 className="project-role">{project.role.map(element => element).join(' | ')}</motion.h3>
        
        


        
        
        <motion.h5 className="project-company">{`${project.company.map(element => element).join(' | ')} + Client name`}</motion.h5>
        
      </motion.div>
          
          
      </span>
        
        
      
      
          
      {children}
    </motion.div>
    </motion.div>
          </Link>
          </motion.div>
    
  );
}

//


//<motion.h5 className="project-technique" variants={titleMotionHidden}>{project.technique.map(element => element).join(' | ')}</motion.h5>
//<motion.h5 className="project-type" variants={titleMotionHidden}>{project.type.map(element => element).join(' | ')}</motion.h5>




/*


*/