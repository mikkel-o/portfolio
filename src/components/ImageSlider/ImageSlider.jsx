import React, { useState } from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {ImageSliderCard} from './ImageSliderCard';
import './css/ImageSlider.css';


const ImageSlider = (props) => {  
  
  const projects = props.items;
  const name = props.name;
 
  const indexStart = props.project.activeFilmIndex ? props.project.activeFilmIndex : 0  ;
  
  console.log(props.project.activeFilmIndex);
    
  const CollectionSize = projects.length,
        [index, setActiveStep] = useState(indexStart),
        goToNextPicture = (e) => { 
          
          if (index === CollectionSize - 1) {
            setActiveStep(0) 
        } else {
          setActiveStep(prevActiveStep => prevActiveStep + 1) 
        }
        
        },
        goBack = (e) => { 
          if (index === 0) {
            setActiveStep(CollectionSize - 1) 
          } else {
            setActiveStep(prevActiveStep => prevActiveStep - 1) 
          }
          
        },
        handleMouseEnter = (e) => { e.target.parentElement.parentElement.classList.add('hide-overlay') },
        handleMouseLeave = (e) => { e.target.parentElement.parentElement.classList.remove('hide-overlay') },
        handleClick = (e) => { 
          //setActiveStep(prevActiveStep => prevActiveStep + (e.target.getAttribute("data-index") - index));
          console.log('click');
        };
  
/*
        useEffect(() => {
          if (props.type === 'feature') {
            props.type === "work" ?
            dispatch(addActiveSlideIndex({name: props.name, index: index}))
            :
            dispatch(addActiveSlideIndexPhoto({name: props.name, index: index}));
          } else {
            props.type === "work" ?
            dispatch(addActiveFilmIndex({name: props.name, index: index}))
            :
            dispatch(addActiveFilmIndexPhoto({name: props.name, index: index}));
          }

        }, [dispatch, props.name, props.type, index]);
      
        */
  return (
    <div className={`${projects[index].name} carousel__wrapper carousel__wrapper--project`}>
        
     
      {/* video/image container */}
      <ul className={'carousel__list project'}>
        {projects.map((project, index) => (
          <>
        <ImageSliderCard name={name} index={index} activeIndex={indexStart} item={project}></ImageSliderCard>
        </>
        ))}
      {/* END .carousel__list */}  
      </ul>

          {/* dot navigation */}
          <ul 
            className={'carousel__dot-list'}
            
          >
            {projects.map((elem, i) => (
              
                <li 
                  className={i === indexStart ? `active carousel__dot-item` : `carousel__dot-item`}
                  data-index={`${i}`}
                  key={i} 
                  onClick={handleClick}
                />
              
            ))}
          </ul>
       {/* previous slide button 
       disabled={index === 0}*/}
       <button 
        className={'carousel__btn carousel__btn--prev'}
        onClick={goBack}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ArrowLeftIcon style={{pointerEvents: 'none'}} className={'carousel__icon carousel__icon--prev'} />
      </button>
      
      {/* next slide button 
      disabled={index === CollectionSize - 1}*/}      
      <button 
        className={'carousel__btn carousel__btn--next'}
        onClick={goToNextPicture}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        
      >
        <ArrowRightIcon style={{pointerEvents: 'none'}} className={'carousel__icon carousel__icon--next'} />
      </button>
      

    {/* END .carousel__wrapper */}
    </div>
    
  );
};
 
export default ImageSlider;


