import React from 'react';
import { useSelector } from "react-redux";
import Projects from "../../features/projects/Projects";
import FiltersMobile from "../../features/filters/FiltersMobile";

export default function ProjectsAll() {
  const state = useSelector(state => state);
  console.log(state);
  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  
  return (
    <div className={'wrapper'}>
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
        <FiltersMobile/>
      </header>
      <main id="projects-wrapper">
        <section className="projects-section">
          <Projects/>
        </section>
      </main>
    </div>
  );
}



/*
 {isMobile ?
  <FiltersMobile items={allProjects} filters={objs} allFilters={fil} filteredItems={allFilteredProjects} pseudoFilteredItems={allPseudoFilteredProjects}/>
      : 
        <header className={'projects-header'} >
        <Filters filtersTitles={filtersTitles}/>
        </header>
      }
*/