import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, selectAllProjects } from "../../features/allProjects/allProjectsSlice";
import AllProjects from "../../features/allProjects/AllProjects";
import Search from "../../features/search/Search";
import Filters from "../../features/filters/Filters";


export default function Projects() {
  const dispatch = useDispatch();
  const { hasError } = useSelector((state) => state.allProjects);
  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  const onTryAgainHandler = () => {
    dispatch(loadProjects());
  };

  
  const roles = [...new Set([].concat.apply([], useSelector(selectAllProjects).map((project) => project.role)).map((e) => e))];



  return (
    <div className={''}>
    <header>
        <Search />
        <Filters filters={roles} />
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
              <h2 className="header">Projects</h2>
              <AllProjects />
            </section>
          </>
        )}
      </main>
  </div> /* end */
  );
}

