import React, { useState, useEffect, useRef } from "react";
import { addActiveFilmIndex, addActiveSlideIndex } from "../../features/projects/projectsSlice";
import { addActiveFilmIndexPhoto, addActiveSlideIndexPhoto } from "../../features/photo/photoSlice";

import { useDispatch } from "react-redux";

export function ImageSliderCard(props) {

  const dispatch = useDispatch();
  const {item, name, index, activeIndex, type} = props;
  
  
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
          setIsIntersecting(entry.isIntersecting);
      },
      {
        root: ref.current.parentElement,
        rootMargin: "0px",
        threshold: .99
      }
    );
    if (isIntersecting) {
      if (type === 'feature') {
        type === "work" ?
        dispatch(addActiveSlideIndex({name: name, index: index}))
        :
        dispatch(addActiveSlideIndexPhoto({name: name, index: index}));
      } else {
        type === "work" ?
        dispatch(addActiveFilmIndex({name: name, index: index}))
        :
        dispatch(addActiveFilmIndexPhoto({name: name, index: index}));
      }
      
    }
    
    
      observer.observe(ref.current);
  
    }, [ref, dispatch, isIntersecting, index, name, type]);  

        

  return (
    
        <li ref={ref} className={props.showTitle ? 'carousel__item carousel__item--featured current-slide' : 'carousel__item current-slide' }>


            {/* video (!add image posibility) */}
            <img alt={'blahblah'} className={`${item.position ? `carousel__video carousel__video--position-${item.position}` : "carousel__video"}`} src={`${item.img}`}/>

            
          
          
        
        {/* END .carousel__item */}
        </li> 
       
    
  );
};
 



