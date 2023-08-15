import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { addActiveFilmIndex, addActiveSlideIndex } from "../../features/projects/projectsSlice";
import { addActiveFilmIndexPhoto, addActiveSlideIndexPhoto } from "../../features/photo/photoSlice";

import { useDispatch } from "react-redux";

export function ImageSliderCard(props) {

  const dispatch = useDispatch();
  const {item, name, index, activeIndex, type} = props;
  console.log('testy');
  
  const ref = useRef(null);
  
  const layout = useSelector(state => state.toggle.layout);
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

      if (ref.current.getElementsByTagName('video').length > 0) {
        if (!item.album){
          //ref.current.getElementsByTagName('video')[0].play();
          
        } else {
          //ref.current.getElementsByTagName('video')[item.activeFilmIndex].play();
          
          //console.log(ref.current.getElementsByTagName('video'));
        }
      } 

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
      
    } else {
      if (ref.current.getElementsByTagName('video').length > 0) {
        if (!item.album){
        //ref.current.getElementsByTagName('video')[0].pause();
        
        
      } else {
        //ref.current.getElementsByTagName('video')[item.activeFilmIndex].pause();
        
      }
      } 
    }
    
      observer.observe(ref.current);
  
    }, [ref, dispatch, isIntersecting, index, name, type, item]);  

        

  return (
    
        <li ref={ref} className={props.showTitle ? 'carousel__item carousel__item--featured current-slide' : 'carousel__item current-slide' }>


            {/* video (!add image posibility) */}
            {item.vid && layout === 0 ? 
                    <video 
                    className={`album__video ${item.position ? `album__video--position-${item.position}` : null}`}
                    src={item.vid} 
                    poster={item.img}
                    
                    loop
                    autoPlay={1}
                    muted
                    playsInline
                    
                   ></video>
           : 
            <img alt={'blahblah'} className={`${item.position ? `carousel__video carousel__video--position-${item.position}` : "carousel__video"}`} src={`${item.img}`}/>
          }
            
          
          
        
        {/* END .carousel__item */}
        </li> 
       
    
  );
};
 



