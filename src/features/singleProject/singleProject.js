import React from "react";
import { useSelector } from "react-redux";
import Project from "../../components/Project";
import { selectProject } from "./singleProjectSlice";
import Spinner from "../../components/Spinner";
import { motion } from 'framer-motion';

const transition = {duration: .6, ease: [0.43, 0.13, 0.23, 0.96]}

const infoMotion = {
  rest: {
    opacity: 1,
    y: 25,
    transition: {
      transition
    }
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      transition
    }
  }
};

const imgMotion = {
  rest: { scale: 1.01 },
  hover: {
    scale: 1.1,
    transition: {
      transition
    }
  }
};

const SingleProject = () => {
  const singleProject = useSelector(selectProject);
  const { isLoading } = useSelector((state) => state.singleProject);

  
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="projects-container">

      
<motion.div key={singleProject.id} className="project" initial={'rest'} whileHover="hover" animate={'rest'} tabIndex={0} transition={transition}>
      <motion.span className="project-container" >
        <motion.div className={'project-info'} variants={infoMotion}>
        <h2 className="project-name">{singleProject.name}</h2>
        <h3 className="project-role">{singleProject.role}</h3>
        <h4 className="project-technique">{singleProject.technique}</h4>
        <h5 className="project-technique">{singleProject.type}</h5>
        <h6 className="project-company">{singleProject.company}</h6>
        
        </motion.div>
        
          
          <motion.img variants={imgMotion} src={singleProject.img} alt="" className="project-image" />
          
        
        
        
      </motion.span>
      
    </motion.div>
      
    </div>
  );
};

export default SingleProject;
