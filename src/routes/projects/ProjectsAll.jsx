import React from 'react';
import { useSelector } from "react-redux";
import { Projects, FeaturedProjects } from "../../features/projects/Projects";
import FiltersMobile from "../../features/filters/FiltersMobile";

export default function ProjectsAll() {
  
  const isFiltersActive = useSelector(state => state.projects.filters.active).length;
  const allProjects = useSelector(state => state.projects.all).length;

  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  
  return (
    <div className={'wrapper'}>
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
        <FiltersMobile/>
      </header>
      <main id="projects-wrapper">
        <section className={'featured-projects-section'}>
          {isFiltersActive === 0 && allProjects !== 0 ? <FeaturedProjects/> : null}
        </section>
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



/*
 {isMobile ?
  <FiltersMobile items={allProjects} filters={objs} allFilters={fil} filteredItems={allFilteredProjects} pseudoFilteredItems={allPseudoFilteredProjects}/>
      : 
        <header className={'projects-header'} >
        <Filters filtersTitles={filtersTitles}/>
        </header>
      }
*/