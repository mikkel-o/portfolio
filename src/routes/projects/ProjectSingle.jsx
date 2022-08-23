import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProject, selectProject } from "../../features/singleProject/singleProjectSlice";
import SingleProject from "../../features/singleProject/singleProject";
import Filters from "../../features/filters/Filters";
import {
  clearFilter,
  removeFilter
} from "../../features/filters/filtersSlice";
import { hideAllToggles} from "../../components/toggleSlice";




export default function ProjectSingle() {
  const params = useParams();
  const dispatch = useDispatch();
  const { hasError } = useSelector((state) => state.singleProject);
  const allProjects = useSelector(state => state.allProjects.projects);
  

  useEffect(() => {
    if (allProjects.length === 0) {
      
        dispatch(loadProject(params.id));
        
    
    }
  }, [dispatch]);
 
  const onTryAgainHandler = () => {
    dispatch(loadProject(params.id));
  };

  


  return (
    <div className={''}>
      <header className={'projects-header'}>
        
      </header>
      <main id="projects-wrapper">
        {hasError ? (
          <div id="error-wrapper">
            <h1>
              Oh no! There was a mess in the kitchen and we couldn't get the
              projects.
            </h1>
            <button onClick={onTryAgainHandler}>Try again</button>
          </div>
        ) : (
          <>
            <section className="projects-section">
              
              <SingleProject />
            </section>
          </>
        )}
      </main>
  </div> /* end */
  );
}

