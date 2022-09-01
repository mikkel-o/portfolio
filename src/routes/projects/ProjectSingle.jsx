import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProject } from "../../features/singleProject/singleProjectSlice";
import SingleProject from "../../features/singleProject/singleProject";

export default function ProjectSingle() {
  const params = useParams();
  const dispatch = useDispatch();
  const { hasError } = useSelector((state) => state.singleProject);
  const allProjects = useSelector(state => state.allProjects.projects);
  
  
  useEffect(() => {
    console.log('running');
    if (allProjects.length === 0) {
      
        dispatch(loadProject(params.id));
        
    
    }
  }, [dispatch, allProjects.length, params.id]);
 
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

