import React from 'react';
import { useSelector } from "react-redux";
import { Projects } from "../../features/projects/Projects";
import Filters from "../../features/filters/Filters";

export default function ProjectsAll() {
  const state = useSelector(state => state);
  const allProjects = useSelector(state => state.projects.all).length;
  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];

  const filtersAll = useSelector(state => state.projects.filters.all);
  const filtersActive =  useSelector(state => state.projects.filters.active);
  const filtersPseudo = useSelector(state => state.projects.filters.pseudo);
  console.log(state);
  
  return (
    <div className={'wrapper'}>
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
        <Filters filtersAll={filtersAll} filtersActive={filtersActive} filtersPseudo={filtersPseudo} type={"work"}/>
      </header>
      <main id="projects-wrapper">
        <section className="projects-section">
          
          {allProjects !== 0 ?
            <Projects/>
            : 
            null
          }
        </section>
      </main>
    </div>
  );
}