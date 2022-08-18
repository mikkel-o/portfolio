import React from "react";

export default function Project({ project, children }) {
  return (
    <div key={project.id} className="project" tabIndex={0}>
      <span className="project-container">
        <h2 className="project-name">{project.name}</h2>
        <h3 className="project-role">{project.role}</h3>
        <h4 className="project-technique">{project.technique}</h4>
        <h5 className="project-technique">{project.type}</h5>
        <h6 className="project-company">{project.company}</h6>
        <div className="image-container">
          <img src={project.img} alt="" className="project-image" />
        </div>
      </span>
      {children}
    </div>
  );
}
