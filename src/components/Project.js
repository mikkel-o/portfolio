import React, {useState, useEffect, useRef, useMemo} from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { addProject, clearProjects, projectCoord, addId, clearId, addLink, clearLink } from "../features/singleProject/singleProjectSlice";
import ImageSlider from './ImageSlider/ImageSlider';



function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}


export default function Project({project, children}) {
  const dispatch = useDispatch();
  const activeFilters = useSelector(state => state.projects.filters.active);
  const filterMethod = useSelector(state => state.projects.filters.method);
  const isViewMobile = useSelector(state => state.toggle.isMobile)
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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


  const ref = useRef(null);
  

  const isInViewport = useIsInViewport(ref);
  

  




  return (
    <motion.div 
      className={''} 
      ref={ref} 
      style={{opacity: 0, translateY: '0px'}}
      animate={{opacity: isInViewport ? 1 : 0, translateY: isInViewport ? '-20px' : '0px'}}
      transition={{duration: 1, ease: [0.3, 0.13, 0.13, 0.96]}}
    >
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
      
    </motion.div>  
  );
}