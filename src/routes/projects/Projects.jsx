import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, selectAllProjects, selectFilteredAllProjects } from "../../features/allProjects/allProjectsSlice";
import AllProjects from "../../features/allProjects/AllProjects";
import Search from "../../features/search/Search";
import Filters from "../../features/filters/Filters";
import {
  clearFilter,
} from "../../features/filters/filtersSlice";


export default function Projects() {
  const dispatch = useDispatch();
  const { hasError } = useSelector((state) => state.allProjects);
  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  const onTryAgainHandler = () => {
    dispatch(loadProjects());
  };
  const onClickClearHandler = (e) => {
    document.querySelectorAll('.filters .active').forEach(child => child.classList.remove('active'))
    dispatch(clearFilter());
  };
  const allFilteredRoles = useSelector(selectFilteredAllProjects).map((project) => project.role).flat();

  const allRoles = useSelector(selectAllProjects).map((project) => project.role).flat();
  const uniqueRoles = [...new Set([].concat.apply([], allRoles.map((e) => e)))];
  const roles = uniqueRoles.map(e => ({key: 'role', value: e, countTotal: allRoles.filter(x => x===e).length, countFilter: allFilteredRoles.filter(x => x===e).length}))

  const allFilteredTechniques = useSelector(selectFilteredAllProjects).map((project) => project.technique).flat();
  const allTechniques = useSelector(selectAllProjects).map((project) => project.technique).flat();
  const uniqueTechniques = [...new Set([].concat.apply([], allTechniques.map((e) => e)))];
  const technique = uniqueTechniques.map(e => ({key: 'role', value: e, countTotal: allTechniques.filter(x => x===e).length, countFilter: allFilteredTechniques.filter(x => x===e).length}))
  
console.log(allFilteredRoles);

  

  const count = {};

  for (const element of allRoles) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }   




  return (
    <div className={''}>
    <header>
        <Search />
        <button onClick={onClickClearHandler}>
          all
        </button>
        <Filters filters={roles} name={'role'}/>
        <Filters filters={technique} name={'technique'}/>
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

