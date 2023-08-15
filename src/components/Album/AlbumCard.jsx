import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageSlider from '../ImageSlider/ImageSlider';
import VideoCard from '../VideoCard/VideoCard';
//import {addSelectedID} from '../../features/projects/projectsSlice';
import { 
  addProject, 
  clearProjects, 
  projectCoord, 
  } from "../../features/singleProject/singleProjectSlice";


const transition = {duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}



export function AlbumCard(props) {
  
  const {children, index, item, allItems, type, scroll, filters, layout } = props; 
  
  const ref = useRef();
  const dispatch = useDispatch();

 //const [isIntersecting, setIsIntersecting] = useState(false);
    
  //const isColumnCount = useSelector(state => state.toggle.layout);
   
/*
  useEffect(() => {
    if (layout === 0) { 
      const observer = new IntersectionObserver(
        ([entry]) => { 
            setIsIntersecting(entry.isIntersecting);
        },
        {
          rootMargin: "0px",
          threshold: .6
        }
      );
      if (isIntersecting) {
      
      
        
        if (ref.current.getElementsByTagName('video').length > 0) {
          if (!item.album){
            ref.current.getElementsByTagName('video')[0].play();
            ref.current.getElementsByTagName('video')[0].currentTime=0;
            
          } else {
            ref.current.getElementsByTagName('video')[item.activeFilmIndex].play();
            ref.current.getElementsByTagName('video')[item.activeFilmIndex].currentTime=0;
            
            //console.log(ref.current.getElementsByTagName('video'));
          }
        } 
        //dispatch(addSelectedID(item));
        
      } else {
        /*
      if (ref.current.getElementsByTagName('video').length > 0) {
        if (!item.album){
        ref.current.getElementsByTagName('video')[0].pause();
        ref.current.getElementsByTagName('video')[0].currentTime=0;
        
      } else {
        ref.current.getElementsByTagName('video')[item.activeFilmIndex].pause();
        ref.current.getElementsByTagName('video')[item.activeFilmIndex].currentTime=0;
      }
      }
    }
      observer.observe(ref.current);
    } 
    }, [ref, layout, isIntersecting, dispatch, item]);  
*/



    const [isActive, setIsActive] = useState(-1);
    const variants = allItems.map((project, i) => (
      {
        initial: {
          opacity: 0,
          scale: 0.9,
          transition: transition
        },
        animate: {
          opacity: 1,
          scale: 1,
          transition: {
            ease: [0.43, 0.13, 0.23, 0.96],
            duration: .5,
            //delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
          }
        },
        exit: isActive === i ? '' : 
        {
          opacity: 0,
          scale: 0.9,
          transition: {
            ease: [0.43, 0.13, 0.23, 0.96],
            duration: .5,
            //delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
          }
        }
      }
    ));
    const onClickHandler = (event, i) => { 
      setIsActive(i);
    }
  
  

  
    
    const [isOpen, setIsOpen] = useState(false);
  
    const onClickyHandler = (event, item) => { 
      setIsOpen(!isOpen);
      
      const childPos = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getBoundingClientRect();
      const index = [...event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);
      const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];
      console.log(event.target);
      dispatch(clearProjects());
      dispatch(addProject(item));
      dispatch(projectCoord(coord));
      
    }
  
    
    
    
    //isInViewport ? ref.current.offsetTop < window.innerHeight/2 && ref.current.offsetTop >= -10 ? console.log(ref.current) : console.log(null) : console.log(null);
   
    return (
      <motion.div  
        variants={variants[index]}
        key={item.id}
        onClick={event => onClickHandler(event, index)}
        className={ `album__card-wrapper ${scroll === "snap" ? "album__card-wrapper--scroll" : null}`}
      >
        <motion.div 
          ref={ref} 
          style={{opacity: 0.7, translateY: '0px'}}
          animate={{opacity: 1, translateY: '0px'}} 
          transition={{duration: 1, ease: [0.3, 0.13, 0.13, 0.96]}}
          
        >
          <Link 
                    to={
                      item.album ? 
                        `/work/${item.name}/${item.album[item.activeFilmIndex ? item.activeFilmIndex : 0].name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`
                      :
                        `/work/${item.name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`
                    } 
                    onClick={event => onClickyHandler(event, item)}
                  >
                     
            <div 
              key={item.id} 
              className={`album__card ${scroll === "snap" ? "album__card--scroll" : null}`}
              tabIndex={item.id} 
            >
            
              
              <motion.span layoutId={item.id}  className={ `album__item ${scroll === "snap" ? "album__item--scroll" : null}`} >
              
                {
                  item.album ? 
                    <ImageSlider project={item} items={item.album} name={item.name} type={type}/>
                  : 
                    item.vid && layout === 0? 
                   <VideoCard src={item.vid} poster={item.img} ></VideoCard>
                   
                    : 
                      <img 
                        src={item.img} 
                        alt="" 
                        className=
                          {
                            `album__image 
                            ${scroll === "snap" ? "album__image--scroll" : null} 
                            ${item.position ? `album__image--position-${item.position}` : null}`
                          } 
                        />
                }
                {children}
               
              </motion.span>
            
            </div>
            </Link>
        </motion.div>  
      </motion.div>
    );
};





