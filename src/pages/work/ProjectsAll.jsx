import React from 'react';
import { useSelector } from "react-redux";
import { Projects } from "../../features/projects/Projects";

export default function ProjectsAll() {
  const allProjects = useSelector(state => state.projects.all).length;
  const isActive = useSelector(state => state.toggle)['filters__menu__mobile'];
  
  return (
    <div className={'wrapper'}>
      
      <header className={isActive ? 'projects-header mobile open' : 'projects-header mobile'} >
        
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