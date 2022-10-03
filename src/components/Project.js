import React, {useState} from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { addProject, clearProjects, projectCoord, addId, clearId, addLink, clearLink } from "../features/singleProject/singleProjectSlice";
import ImageSlider from './ImageSlider/ImageSlider';

export default function Project({project, children}) {
  const dispatch = useDispatch();
  const activeFilters = useSelector(state => state.projects.filters.active);
  const filterMethod = useSelector(state => state.projects.filters.method);
  const isViewMobile = useSelector(state => state.toggle.isMobile)
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

  const onClickHandlerPlay = (event, activeFilmIndex) => { 
    dispatch(clearId());
    dispatch(clearLink());
    
      
    dispatch(addId(project.id));
    setTimeout(() => {
      
      project.album ? dispatch(addLink(project.album[activeFilmIndex].embed)) : dispatch(addLink(project.embed));  
    }, "500")  
    

  }

  return (
    <div className={''}>
      <div className="">
        <div 
          key={project.id} 
          className="project" 
          tabIndex={project.id} 
        >
          {isViewMobile ? 
            <span className="project-container" >
              <Link  
                to={`/projects/${project.name}?filters=${activeFilters ? activeFilters.map(e => e.value + '%2C') : ''}`} 
                onClick={onClickHandler}
              >  
                <img 
                  src={project.img} 
                  alt="" 
                  className="project-image" 
                />
                <div className={'project-info'}>
                  {/*<motion.h3 exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className="project-role">{project.role.map(element => element).join(' | ')}</motion.h3>*/}
                </div>
                <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg'}></motion.div>
                <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'project-info-bg-bottom'}></motion.div>
              </Link>
            </span>
          :   
            <motion.span layoutId={project.id} className={"project-container"} >
              {
                project.album ? 
                  
                  <ImageSlider project={project} items={project.album} name={project.name}/>
                    
                  
                  : 
                  <img src={project.img} alt="" className="project-image" />
              }
              
              <div className={'project-info'}>
                <Link 
                  to={
                      project.album ? 
                        `/projects/${project.name}/${project.album[project.activeFilmIndex ? project.activeFilmIndex : 0].name}?filters=${activeFilters ? activeFilters.map(e => e.value + '%2C') : ''}&method=${filterMethod ? filterMethod : ''}`
                      :
                      `/projects/${project.name}?filters=${activeFilters ? activeFilters.map(e => e.value + '%2C') : ''}&method=${filterMethod ? filterMethod : ''}`
                      } 
                  onClick={onClickHandler}
                >
                  <button className={'projects-more-btn'}>
                    <span className={'span-one'}></span>
                    <span className={'span-two'}></span>
                    <span className={'span-three'}>more</span>
                  </button>
                </Link>
                <button className={'projects-play-btn'} onClick={event => onClickHandlerPlay(event, project.activeFilmIndex)}>
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