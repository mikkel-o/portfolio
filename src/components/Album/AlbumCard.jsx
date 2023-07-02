import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";

import ImageSlider from '../ImageSlider/ImageSlider';


const transition = {duration: 0.3, ease: [0.43, 0.23, 0.63, 0.96]}



export function AlbumCard(props) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        

        
          
          setIsIntersecting(entry.isIntersecting);
          
        
      },
      {
        rootMargin: "0px",
        threshold: 0.1
      }
    );
    
      observer.observe(ref.current);
    
    
  }, [ref]);  
  

  
  const {children, index, item, allItems, type, layout, scroll } = props; 
    
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
  
  
    
    const isColumnCount = useSelector(state => state.toggle.columnCount)
   

  

  
    
    
    if (isIntersecting) {
      console.log(item.id);
    }
    
    //isInViewport ? ref.current.offsetTop < window.innerHeight/2 && ref.current.offsetTop >= -10 ? console.log(ref.current) : console.log(null) : console.log(null);
   
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
          animate={{opacity: isIntersecting ? 1 : 0, translateY: layout !== "mix" ? '0px' : '0px'}} 
          transition={{duration: 1, ease: [0.3, 0.13, 0.13, 0.96]}}
          
        >
          
            <div 
              key={item.id} 
              className={`album__card ${layout === "mix" ? "album__card--mix" : null} ${scroll === "snap" ? "album__card--scroll" : null}`}
              tabIndex={item.id} 
            >
            
              
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
                      <img 
                        src={item.img} 
                        alt="" 
                        className=
                          {
                            `album__image 
                            ${layout === "mix" ? "album__image--mix" : null} 
                            ${scroll === "snap" ? "album__image--scroll" : null} 
                            ${item.position ? `album__image--position-${item.position}` : null}`
                          } 
                        />
                }
                {children}
               
              </motion.span>
            
            </div>
          
        </motion.div>  
      </motion.div>
    );
};





