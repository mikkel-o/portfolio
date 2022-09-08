import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { loadProjects, selectAllProjects } from "../../features/allProjects/allProjectsSlice";
//https://developer.mozilla.org/en-US/docs/Web/API/History_API

export default function ProjectCategories() {
  const dispatch = useDispatch();
  const allProjects = useSelector(selectAllProjects);

  const navigate = useNavigate();
    const goToPosts = (event, c) => {
      
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
    
  return (
    <div className={''}>
      <button className={'projects-category-allBtn'} onClick={event => goToPosts(event)}>Show all</button>
      <ul className={'projects-category-list'}>
        {categories.map((c, i) => (
          <li key={i} className={'projects-category-item'} onClick={event => goToPosts(event, c)}>
            <h2 className={'projects-category-title'}>{c}</h2>
            <img className={'projects-category-img'} alt={'placeholder'} src={images[i]} />
          </li>
        ))

        }
      </ul>
      
      
  </div> /* end */
  );
}

