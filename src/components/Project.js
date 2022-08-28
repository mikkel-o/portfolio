import React from "react";
import { 
  Link
} from "react-router-dom";
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { addProject, clearProjects } from "../features/singleProject/singleProjectSlice";

const transitionOne = {duration: .6, ease: [0.43, 0.13, 0.23, 0.96]}
const transitionTwo = {duration: .8, ease: [0.3, 0.13, 0.13, 0.96]}



const titleMotionHidden = {
  rest: {
    opacity: 0,
    x: 0,
    transition: transitionTwo
  },
  animate: {
    opacity: 1,
  },
  hover: {
    opacity: 1,
    x: 0,
    transition: transitionTwo
  },
  tap: {
    opacity: 1,
    x: 0,
    transition: transitionTwo
  }
  
};

const btnMotion = {
  rest: {
    opacity: 0,
    x: 50,
    transition: transitionTwo
  },
  hover: {
    opacity: 1,
    x: 0,
    transition: transitionTwo
  },
  tap: {
    opacity: 1,
    x: 0,
    transition: transitionTwo
  }
  
};
const imgMotion = {
  rest: { scale: 1.01 },
  hover: {
    scale: 1.1,
    transition: transitionOne
  },
  tap: {
    scale: 1.1,
    transition: transitionOne
  }
};



export default function Project({ project, children }) {
  const dispatch = useDispatch();
const onClickHandler = (e) => { 
  dispatch(clearProjects())
  dispatch(addProject(project))
}


function onPan(event, info) {
  console.log(info.point.x, info.point.y)
  console.log(info);
  event.target.focus();
}



  return (
    <motion.div key={project.id} className="project" 
    initial={'rest'} whileFocus={"hover"} onPan={onPan} whileHover={"hover"} animate={'rest'} tabIndex={project.id} transition={{staggerChildren: 0.05}}>
      <span className="project-container" >
        <motion.img variants={imgMotion} src={project.img} alt="" className="project-image" />
        <motion.div className={'project-info'} >
        <motion.h5 className="project-technique" variants={titleMotionHidden}>{project.technique.map(element => element).join(' | ')}</motion.h5>
          <motion.h2 className="project-name" variants={titleMotionHidden}>{project.name}</motion.h2>
          
          
          <motion.h3 className="project-role" variants={titleMotionHidden}>{project.role.map(element => element).join(' | ')}</motion.h3>
          
          <motion.div className="project-button-wrapper" variants={btnMotion}>
            <Link  to={`/projects/${project.name}`} onClick={onClickHandler}><button className={'more'}> more </button> </Link>
            <button className={'play'}> play</button>
          </motion.div>


          <motion.h5 className="project-type" variants={titleMotionHidden}>{project.type.map(element => element).join(' | ')}</motion.h5>
          <motion.h5 className="project-company" variants={titleMotionHidden}>{project.company.map(element => element).join(' | ')}</motion.h5>
          
        </motion.div>
        
          
          
          
        
        
        
      </span>
      {children}
    </motion.div>
  );
}

//whileFocus={"hover"}  




