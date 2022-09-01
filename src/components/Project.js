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




export default function Project({ project, children }) {
  const dispatch = useDispatch();
  

  const [isOpen, setIsOpen] = useState(false)

const onClickHandler = (event) => { 
  setIsOpen(!isOpen);

  const parentPos = event.target.parentElement.parentElement.parentElement.parentElement.getBoundingClientRect();
  const childPos = event.target.parentElement.parentElement.parentElement.getBoundingClientRect();
  console.log(event.target.parentElement.parentElement.parentElement);
  console.log(childPos);
  const index = [...event.target.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);

  const relativePos = {
y: childPos.top - parentPos.top,
x: childPos.left - parentPos.left,
width: childPos.width,
height: childPos.height,
index: index
  };

  


console.log(index);

console.log(relativePos);

// something like: {top: 50, right: -100, bottom: -50, left: 100}

console.log(childPos);
  console.log(relativePos);
  const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];
  console.log(childPos.y)
  console.log(relativePos.y)
  dispatch(clearProjects());
  dispatch(addProject(project));
  dispatch(projectCoord(coord));
console.log(coord)
}


function onTap(event, info) {
  //coord = [event.target.getBoundingClientRect().x, event.target.getBoundingClientRect().y ];

}

function onPan(event, info) {

  event.target.focus();
}

//whileHover={"hover"} FIX the hover it cause weird animation break on exiting the page

return (
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
        
        
      <motion.div className={'project-button'} variants={infoMotion}>
      <Link  to={`/projects/${project.name}`} onClick={onClickHandler}>
      <motion.div className="project-button-wrapper">
            <button className={'more'}> more </button> 
          </motion.div>
          </Link>
          </motion.div>
      {children}
    </motion.div>
    
  );
}

//


//<motion.h5 className="project-technique" variants={titleMotionHidden}>{project.technique.map(element => element).join(' | ')}</motion.h5>
//<motion.h5 className="project-type" variants={titleMotionHidden}>{project.type.map(element => element).join(' | ')}</motion.h5>




/*


*/