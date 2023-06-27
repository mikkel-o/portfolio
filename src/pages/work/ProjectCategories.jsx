import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import {motion} from "framer-motion";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
            

const ease = [0.43, 0.23, 0.63, 0.96];


export default function ProjectCategories() {
  const navigate = useNavigate();
  const allProjects = useSelector(state => state.projects.all);
  const goToPosts = (event, categoryItem, i) => {   
    const list = event.target.parentElement.parentElement.children;
    for (let ind = 0; ind < list.length; ind++) {
     list[ind].style.transition = "none";
    }
    
    setIsActive(i);
    const newParams = categoryItem ? categoryItem.replace(/\s/g, '+') : '';
    window.history.replaceState({}, "", categoryItem ? `?filters=${newParams === 'monkey+tennis' ? 'monkey+tennis' : newParams === 'editor' ? 'editor' : newParams === 'artist' ? '3D+artist' : newParams}` : '?filters=')
    navigate({
      pathname: '/work',
      search: categoryItem ? `?filters=${newParams === 'monkey+tennis' ? 'monkey+tennis' : newParams === 'editor' ? 'editor' : newParams === 'artist' ? '3D+artist' : newParams}` : '',
    });
  }
  const categoryList = 
    [...new Set(
      allProjects.map(
        e => e.company !== undefined ? e.company : null).flat().filter(
          element => {
            if (element) {
              return true;
            }
            return false;
          }
        )
      )
    ];
  const posters = ['/projects/_categories/EDIT_TEASER_square_e_poster_thumb.jpg', '/projects/_categories/CG_TEASER_square_h_poster_thumb.jpg', '/projects/_categories/PRODUCTION_TEASER_square_f_poster_thumb.jpg'];
  const videos = ['/projects/_categories/EDIT_TEASER_square_e_1.mp4', '/projects/_categories/CG_TEASER_square_h_1.mp4', '/projects/_categories/PRODUCTION_TEASER_square_g_1.mp4'];
  const [isActive, setIsActive] = useState(-1);
  const list = allProjects.map((project, i) => (
    {
      initial: {
        opacity: 1,
        scale: 1,
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          ease: ease,
          duration: .4,
          delay: Math.abs(isActive - i) > 8 ? 0 : .03 * Math.abs(isActive - i),
        }
      },
      exit: isActive === i ? {
        opacity: 0,
        scale: .8,
        transition: {
          ease: ease,
          duration: .6,
          opacity: {
            duration: .3,
            delay: .3
          }
        }
      } : 
      isActive === i - 1 ? {
        opacity: 0,
        x: 100,

        transition: {
          ease: ease,
          duration: .5,
          delay: .1,
        }
      } : 
      isActive === i - 2 ? {
        opacity: 0,
        x: 100,

        transition: {
          ease: ease,
          duration: .5,
          delay: 0,
        }
      } : 
      isActive === i + 1 ? {
        opacity: 0,
        x: -100,

        transition: {
          ease: ease,
          duration: .5,
          delay: .1,
        }
      } :
      isActive === i + 2 ? {
        opacity: 0,
        x: -100,

        transition: {
          ease: ease,
          duration: .5,
          delay: 0,
        }
      } : { 
      opacity: 0,
      transition: {
        ease: ease,
        duration: 0,
      }
    }
    }

  ));


  return (
    <motion.div 
      className={''}
      initial={'initial'} 
      animate={'animate'} 
      exit={'exit'} 
    >
      <VideoPlayer />
      <button className={'projects-category-allBtn'} onClick={event => goToPosts(event)}>Show all</button>
      <ul className={'projects-category-list'}>
        {categoryList.map((categoryItem, i) => (
          <motion.li  
            variants={list[i]} key={i} 
            className={'projects-category-item'}
            onClick={event => goToPosts(event, categoryItem, i)}
          >
            <h2 className={'projects-category-title'}>{categoryItem}</h2>
            
            <video 
              className={'projects-category-img'} 
              src={videos[i]} 
              poster={posters[i]}
              onMouseOver={event => {
                const list = event.target.parentElement.parentElement.children;
                const target = event.target.parentElement;
                const index = Array.prototype.indexOf.call(list, target);
                for (let ind = 0; ind < list.length; ind++) {
                  if (ind !== index) {
                    list[ind].classList.add('fade');
                    list[ind].classList.add('shrink');
                    list[ind].classList.remove('grow');
                  } else {
                    list[ind].classList.remove('fade');
                    list[ind].classList.remove('shrink');
                    list[ind].classList.add('grow');
                  }

                 
                
                }
                event.target.play();

              }}
              onMouseOut={event => {
                const list = event.target.parentElement.parentElement.children;
                for (let ind = 0; ind < list.length; ind++) {
                  list[ind].classList.remove('fade');
                  list[ind].classList.remove('grow');
                  list[ind].classList.remove('shrink');
                  
                  
                }
                
                event.target.pause(); 
                event.target.currentTime=0
              }}
              loop
              
            ></video>
            <div className={'projects-category-bg'}></div>
          </motion.li>
        ))}
      </ul>
      
      
  </motion.div>
  );
}

