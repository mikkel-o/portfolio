import React from "react";
import { 
  Link
} from "react-router-dom";
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { addProject, clearProjects } from "../features/singleProject/singleProjectSlice";

const transitionOne = {duration: .6, ease: [0.43, 0.13, 0.23, 0.96]}
const transitionTwo = {duration: .8, ease: [0.3, 0.13, 0.13, 0.96]}



const titleMotion = {
  rest: {
    opacity: 0,
    x: -25,
    transition: transitionTwo
  },
  hover: {
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
  }
  
};
const imgMotion = {
  rest: { scale: 1.01 },
  hover: {
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

  return (
    <motion.div key={project.id} className="project" initial={'rest'} whileHover={"hover"} animate={'rest'} tabIndex={0} transition={{staggerChildren: 0.05}}>
      <span className="project-container" >
      <motion.img variants={imgMotion} src={project.img} alt="" className="project-image" />
        <motion.div className={'project-info'}>
        <motion.h2 className="project-name" variants={titleMotion}>{project.name}</motion.h2>
        <motion.h3 className="project-role" variants={titleMotion}>{project.role.map(element => element).join(' | ')}</motion.h3>
        <motion.h4 className="project-technique" variants={titleMotion}>{project.technique.map(element => element).join(' | ')}</motion.h4>
        <motion.h5 className="project-technique" variants={titleMotion}>{project.type.map(element => element).join(' | ')}</motion.h5>
        <motion.h6 className="project-company" variants={titleMotion}>{project.company.map(element => element).join(' | ')}</motion.h6>
        <motion.div variants={btnMotion}>
          <Link  to={`/projects/${project.name}`} onClick={onClickHandler}><button className={'more'}> more </button> </Link>
          <button className={'play'}> play</button>
        </motion.div>
        </motion.div>
        
          
          
          
        
        
        
      </span>
      {children}
    </motion.div>
  );
}






