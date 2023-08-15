import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { addActiveFilmIndex, addActiveSlideIndex } from "../../features/projects/projectsSlice";
import { addActiveFilmIndexPhoto, addActiveSlideIndexPhoto } from "../../features/photo/photoSlice";
import VideoCard from '../VideoCard/VideoCard';
import { useDispatch } from "react-redux";

export function ImageSliderCard(props) {

  const dispatch = useDispatch();
  const {item, name, index, activeIndex, type} = props;
  
  
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
                    <VideoCard src={item.vid} poster={item.img} ></VideoCard>
                   
           : 
            <img alt={'blahblah'} className={`${item.position ? `carousel__video carousel__video--position-${item.position}` : "carousel__video"}`} src={`${item.img}`}/>
          }
            
                <div className={'album__overlay album__overlay--scroll'}>
                <div key={item.id + 55} className={"test"}>
              <div className={"album__title-wrapper album__title-wrapper--scroll"}>
                <h2 className="album__overlay-title album__overlay-title--scroll">{item.title ? item.title : ""}</h2>
                <h3 className="album__overlay-subtitle album__overlay-subtitle--scroll">{item.role ? item.role.map(element => element).join(' | ') : ""}</h3> 
              </div>
              </div>
              </div>
              
          
        {/* END .carousel__item */}
        </li> 
       
    
  );
};
 



