import React from "react";
import { useSelector } from "react-redux";
import { Album} from "../../components/Album/Album";


export function Projects() {
  const activeProjects = useSelector(state => state.projects.active);
  const allProjects = useSelector(state => state.projects.all);
  const activeFilters = useSelector(state => state.projects.filters.active);
  return (
    <div>
     <Album items={activeProjects} allItems={allProjects} filters={activeFilters} type={"work"} overlay={true} layout={"grid"} scroll={"snap"}/>
    </div>
  );

};

