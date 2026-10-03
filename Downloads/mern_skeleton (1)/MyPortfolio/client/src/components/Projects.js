import React from 'react';

function Projects() {
  const projectList = [
    {
      title: "E-Commerce Database System",
      description: "Designed a 15-table relational database schema with analytical SQL queries.",
      role: "Database Designer"
    },
    {
      title: "Conservation Web Portal",
      description: "Built an interactive web portal highlighting environmental conservation zones.",
      role: "Frontend Developer"
    },
    {
      title: "AI Agent Search Engine",
      description: "Implemented state-space search algorithms in Python for an automated problem solver.",
      role: "Python Developer"
    }
  ];

  return (
    <div className="page-container">
      <h1>My Projects</h1>
      <div className="grid">
        {projectList.map((project, index) => (
          <div key={index} className="card">
            <h3>{project.title}</h3>
            <p><strong>Role:</strong> {project.role}</p>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;