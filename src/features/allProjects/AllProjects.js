import React from "react";

import Project from "../../components/Project";


const AllProjects = (props) => {
  

 /* const [searchParams] = useSearchParams();
  const filters = searchParams.get("filters"); // "1234"
  const queryFilters = filters ? filters.split(',') : [];
  console.log(queryFilters);
*/

  const allProjects = props.projects;
  const queryParams = props.params;
  /*const { isLoading } = props.projects;;
  if (isLoading) {
    return <Spinner />;
  }*/

 
  




  return (
    <div className="projects-container">

      {allProjects.map((project) => (
        <Project project={project} key={project.id} params={queryParams}>
          
        </Project>
      ))}
    </div>
  );
};

export default AllProjects;
