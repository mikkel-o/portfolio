import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProject } from "../../features/singleProject/singleProjectSlice";
import SingleProject from "../../features/singleProject/singleProject";


export default function ProjectSingle() {
  const params = useParams();
  const dispatch = useDispatch();
  
  const allProjects = useSelector(state => state.projects.all);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    if (allProjects.length === 0) {
      
        dispatch(loadProject(params.id));
        
    
    }
  }, [dispatch, allProjects.length, params.id]);
 
  
  


  return (
    <div className={''}>
      
      <main id="projects-wrapper">
       
          
            <section className="projects-section">
              
              <SingleProject film={params.id}/>
            </section>
          
      </main>
  </div> /* end */
  );
}







