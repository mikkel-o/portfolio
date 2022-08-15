import React from "react";

export default function Project({ project, children }) {
  return (
    <div key={project.id} className="project" tabIndex={0}>
      <span className="project-container">
        <h3 className="project-name">{project.name}</h3>
        <div className="image-container">
          <img src={project.img} alt="" className="project-image" />
        </div>
      </span>
      {children}
    </div>
  );
}
