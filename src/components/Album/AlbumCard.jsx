import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProject, clearProjects, projectCoord } from "../../features/singleProject/singleProjectSlice";
import ImageSlider from '../ImageSlider/ImageSlider';


const transition = {duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}

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

export function AlbumCard(props) {
    const {children, index, item, allItems, filters, type, layout, scroll } = props; 
    
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
            duration: .4,
            delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
          }
        },
        exit: isActive === i ? '' : 
        {
          opacity: 0,
          transition: {
            ease: [0.43, 0.13, 0.23, 0.96],
            duration: .4,
            delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
          }
        }
      }
    ));
    const onClickHandler = (event, i) => { 
      setIsActive(i);
    }
  
    const dispatch = useDispatch();
    
    const isColumnCount = useSelector(state => state.toggle.columnCount)
    const isViewMobile = useSelector(state => state.toggle.isMobile)
    const [isOpen, setIsOpen] = useState(false);
    const onClickyHandler = (event) => { 
      setIsOpen(!isOpen);
      const childPos = event.target.parentElement.parentElement.parentElement.getBoundingClientRect();
      const index = [...event.target.parentElement.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement.parentElement);
      const coord = [childPos.x, childPos.y, childPos.width, childPos.height, index];
      dispatch(clearProjects());
      dispatch(addProject(item));
      dispatch(projectCoord(coord));
    }
  

  console.log(isColumnCount);
    const ref = useRef(null);
    const isInViewport = useIsInViewport(ref);

    return (
      <motion.div  
        variants={variants[index]}
        key={item.id} 
        onClick={event => onClickHandler(event, index)}
        className={ `album__card-wrapper ${layout === "mix" ? "album__card-wrapper--mix" : null} ${scroll === "snap" ? "album__card-wrapper--scroll" : null}`}
      >
        <motion.div 
          ref={ref} 
          style={{opacity: 0, translateY: '0px'}}
          animate={{opacity: isInViewport ? 1 : 0, translateY: layout !== "mix" && isInViewport ? '0px' : '0px'}} 
          transition={{duration: 1, ease: [0.3, 0.13, 0.13, 0.96]}}
        >
          
            <div 
              key={item.id} 
              className={`album__card ${layout === "mix" ? "album__card--mix" : null} ${scroll === "snap" ? "album__card--scroll" : null}`}
              tabIndex={item.id} 
            >
            {isViewMobile ? 
              <span className={ `album__item ${layout === "mix" ? "album__item--mix" : null} ${scroll === "snap" ? "album__item--scroll" : null}`}>
                <Link  
                  to={`/work/${item.name}?filters=${filters ? filters.map(e => e.value + '%2C') : ''}`} 
                  onClick={onClickyHandler}
                >  
                  <img 
                    src={item.img} 
                    alt="" 
                    className={`album__image ${layout === "mix" ? "album__image--mix" : null} ${scroll === "snap" ? "album__image--scroll" : null}`} 
                  />
                  <div className={'album__overlay'}></div>
                  <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'album__overlay-bg'}></motion.div>
                  <motion.div exit={{opacity: 0, transition: {ease: [.43, .13, .23, .96], duration: .2}}} className={'album__overlay-bg-bottom'}></motion.div>
                </Link>
              </span>
            :   
              <motion.span layoutId={item.id}  className={ `album__item ${layout === "mix" ? "album__item--mix" : null} ${scroll === "snap" ? "album__item--scroll" : null}`} >
                {
                  item.album ? 
                    <ImageSlider project={item} items={item.album} name={item.name} type={type}/>
                  : 
                    item.vid ? 
                    <video 
                    className={`album__video ${layout === "mix" ? "album__video--mix" : null} ${scroll === "snap" ? "album__video--scroll" : null} ${item.position ? `album__video--position-${item.position}` : null}`}
                    src={item.vid} 
                    poster={item.img}
                    loop
                    
                    autoPlay={isColumnCount >= 2 ? 0 : 1}
                    playsInline
                    muted
                   
                    onMouseOver=
                      {
                        isColumnCount >= 2 ?
                          event => {
                            console.log(event.target);
                            event.target.play();
                          } 
                        : 
                          null
                      }
                    onMouseOut=
                      {
                        isColumnCount >= 2 ?
                          event => {                      
                            event.target.pause(); 
                            event.target.currentTime=0
                          }
                        : 
                          null
                      }
                  ></video>
                    : 
                      <img src={item.img} alt="" className={`album__image ${layout === "mix" ? "album__image--mix" : null} ${scroll === "snap" ? "album__image--scroll" : null} ${item.position ? `album__image--position-${item.position}` : null}`} />
                }
                {children}
               
              </motion.span>
            }
            </div>
          
        </motion.div>  
      </motion.div>
    );
};




