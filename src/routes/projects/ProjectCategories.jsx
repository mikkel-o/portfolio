import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import {motion} from "framer-motion";

const ease = [0.43, 0.23, 0.63, 0.96];


export default function ProjectCategories() {
  const navigate = useNavigate();
  const allProjects = useSelector(state => state.projects.all);
  const goToPosts = (event, categoryItem, i) => {    
    setIsActive(i);
    const newParams = categoryItem ? categoryItem.replace(/\s/g, '+') : '';
    window.history.replaceState({}, "", categoryItem ? `?filters=${newParams === 'producer' ? 'producer%2Cexecutive+producer%2Cdevelopment+producer' : newParams}${newParams === 'producer' ? '&method=OR' : '&method=AND'}` : '?filters=')
    navigate({
      pathname: '/projects',
      search: categoryItem ? `?filters=${newParams === 'producer' ? 'producer%2Cexecutive+producer%2Cdevelopment+producer' : newParams}${newParams === 'producer' ? '&method=OR' : '&method=AND'}` : '',
    });
  }
  const categoryList = 
    [...new Set(
      allProjects.map(
        e => e.category !== undefined ? e.category : null).flat().filter(
          element => {
            if (element) {
              return true;
            }
            return false;
          }
        )
      )
    ];
  const posters = ['/img/TO3_Poster.jpg', '/img/Bird_Teaser_Thumb.jpg', '/img/Elephunk_Poster.jpg'];
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
      <button className={'projects-category-allBtn'} onClick={event => goToPosts(event)}>Show all</button>
      <ul className={'projects-category-list'}>
        {categoryList.map((categoryItem, i) => (
          <motion.li  variants={list[i]} key={i} className={'projects-category-item'} onClick={event => goToPosts(event, categoryItem, i)}>
            <h2 className={'projects-category-title'}>{categoryItem}</h2>
            <img className={'projects-category-img'} alt={'placeholder'} src={posters[i]} />
          </motion.li>
        ))}
      </ul>
      
      
  </motion.div>
  );
}

