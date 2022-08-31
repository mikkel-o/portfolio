import React from "react";
import { useSelector } from "react-redux";
import Project from "../../components/Project";
import { selectFilteredAllProjects } from "./allProjectsSlice";
import Spinner from "../../components/Spinner";

const AllProjects = () => {
  const allProjects = useSelector(selectFilteredAllProjects);
  const { isLoading } = useSelector((state) => state.allProjects);

  
  if (isLoading) {
    return <Spinner />;
  }

 
  

  return (
    <div className="projects-container">

      {allProjects.map((project) => (
        <Project project={project} key={project.id}>
          
        </Project>
      ))}
    </div>
  );
};

export default AllProjects;
