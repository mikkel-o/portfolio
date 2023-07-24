import React, { useState, useEffect, useRef } from "react";
import { addActiveFilmIndex } from "../../features/projects/projectsSlice";
import { useDispatch } from "react-redux";

export function ImageSliderCard(props) {

  const dispatch = useDispatch();
  const {item, name, index, activeIndex} = props;
  
  
  const ref = useRef(null);
  
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    if (activeIndex === index) {
      
      ref.current.parentElement.scrollLeft = ref.current.offsetWidth * index;
    }
  }, [ref, activeIndex, index]);  
  useEffect(() => {
    const observer = new IntersectionObserver(
      
      ([entry]) => { 
        console.log('intersection running');
          setIsIntersecting(entry.isIntersecting);
      },
      {
        root: ref.current.parentElement,
        rootMargin: "0px",
        threshold: 1
      }
    );
    if (isIntersecting) {
      console.log('running dispatch active film');
      dispatch(addActiveFilmIndex({name: name, index: index}))
    }
    
    
      observer.observe(ref.current);
  
    }, [ref, dispatch, isIntersecting, index, name]);  

        

  return (
    
        <li ref={ref} className={props.showTitle ? 'carousel__item carousel__item--featured current-slide' : 'carousel__item current-slide' }>


            {/* video (!add image posibility) */}
            <img alt={'blahblah'} className={`${item.position ? `carousel__video carousel__video--position-${item.position}` : "carousel__video"}`} src={`${item.img}`}/>

            
          
          
        
        {/* END .carousel__item */}
        </li> 
       
    
  );
};
 



