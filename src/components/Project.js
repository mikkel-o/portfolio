import React, {useState} from "react";
import { 
  Link
} from "react-router-dom";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { addProject, clearProjects, projectCoord, addId, clearId } from "../features/singleProject/singleProjectSlice";

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
  const isViewMobile = useSelector(state => state.toggle.isMobile)
  //const params = props.params;
  const [isOpen, setIsOpen] = useState(false);
  

  
const onClickHandler = (event) => { 
  setIsOpen(!isOpen);
  const childPos = event.target.parentElement.parentElement.parentElement.getBoundingClientRect();
  const index = [...event.target.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);
  const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];

  dispatch(clearProjects());
  dispatch(addProject(project));
  dispatch(projectCoord(coord));

}

const onClickHandlerPlay = () => { 
  
  
  
  dispatch(clearId());
  dispatch(addId(project.id));
  
  
}


  return (
    <div className={''} variants={infoMotion}>
      <div className="">
      


        <div 
          key={project.id} 
          className="project" 
          tabIndex={project.id} 
        >
          {isViewMobile ? 
            <span className="project-container" >
              <Link  to={`/projects/${project.name}?filters=${params.map(e => e + '%2C')}`} onClick={onClickHandler}>  
                <img variants={imgMotion} src={project.img} alt="" className="project-image" />
                <div className={'project-info'} variants={infoMotion}>
                  <motion.h3 exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className="project-role">{project.role.map(element => element).join(' | ')}</motion.h3>
                </div>
                <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg'}></motion.div>
                <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg-bottom'}></motion.div>
              </Link>
            </span>
          :   
          
            <motion.span layoutId={project.id} className={"project-container"} >
              <img variants={imgMotion} src={project.img} alt="" className="project-image" />
              <div className={'project-info'} variants={infoMotion}>
                <motion.h2 className="project-name">{project.name}</motion.h2>
                <Link  to={`/projects/${project.name}?filters=${params.map(e => e + '%2C')}`} onClick={onClickHandler}>  
                  <button className={'projects-more-btn'}>
                    <span className={'span-one'}></span>
                    <span className={'span-two'}></span>
                    <span className={'span-three'}>more</span>
                  </button>
                </Link>
                <button className={'projects-play-btn'} onClick={onClickHandlerPlay}>
                  <span className={'span-one'}></span>
                  <span className={'span-two'}></span>
                  <span className={'span-three'}>play</span>
                </button>
                <motion.h3 exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className="project-role">{project.role.map(element => element).join(' | ')}</motion.h3>
              </div>
              <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg'}></motion.div>
              <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg-bottom'}></motion.div>
            </motion.span>
          }
          {children}
        </div>
      </div>
      
    </div>  
  );
}

//


//<motion.h5 className="project-technique" variants={titleMotionHidden}>{project.technique.map(element => element).join(' | ')}</motion.h5>
//<motion.h5 className="project-type" variants={titleMotionHidden}>{project.type.map(element => element).join(' | ')}</motion.h5>




/*

{items.map(item => (
  <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
    <motion.h5>{item.subtitle}</motion.h5>
    <motion.h2>{item.title}</motion.h2>
  </motion.div>
))}

<AnimatePresence>
  {selectedId && (
    <motion.div layoutId={selectedId}>
      <motion.h5>{item.subtitle}</motion.h5>
      <motion.h2>{item.title}</motion.h2>
      <motion.button onClick={() => setSelectedId(null)} />
    </motion.div>
  )}
</AnimatePresence>
*/