import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { loadProjects, selectAllProjects } from "../../features/allProjects/allProjectsSlice";
import {motion} from "framer-motion";
//https://developer.mozilla.org/en-US/docs/Web/API/History_API



const ease = [0.43, 0.23, 0.63, 0.96];



export default function ProjectCategories() {




  const dispatch = useDispatch();
  const allProjects = useSelector(selectAllProjects);

  const navigate = useNavigate();
    const goToPosts = (event, c, i) => {
      setIsActive(i);
      const param = c ? c.replace(/\s/g, '+') : '';
      
      window.history.replaceState({}, "", c ? `?filters=${param}` : '?filters=')
      navigate({
        pathname: '/projects',
        search: c ? `?filters=${param}` : '',
      });
    }
    useEffect(() => {
      if (allProjects.length === 0) {
          dispatch(loadProjects());
      }
    }, [dispatch, allProjects.length]);
    
    const categories = [...new Set(allProjects.map(e => e.technique).flat())];
    
    const images = ['/img/TO3_Poster.jpg', '/img/Bird_Teaser_Thumb.jpg', '/img/Elephunk_Poster.jpg'];
    


    const [isActive, setIsActive] = useState(-1);


    const list = allProjects.map((project, i) => (
      {
        initial: {
          opacity: 0,
          scale: .9,
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
  console.log(isActive);




  return (
    <motion.div 
      className={''}
      initial={'initial'} 
      animate={'animate'} 
      exit={'exit'} 
      
    >
      <button className={'projects-category-allBtn'} onClick={event => goToPosts(event)}>Show all</button>
      <ul className={'projects-category-list'}>
        {categories.map((c, i) => (
          <motion.li variants={list[i]} key={i} className={'projects-category-item'} onClick={event => goToPosts(event, c, i)}>
            <h2 className={'projects-category-title'}>{c}</h2>
            <img className={'projects-category-img'} alt={'placeholder'} src={images[i]} />
          </motion.li>
        ))

        }
      </ul>
      
      
  </motion.div> /* end */
  );
}

