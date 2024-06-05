// src/components/ProjectList.js
import React from 'react';
import { Link } from 'react-router-dom';

const projectData = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'Description of Project Alpha',
    clientDetails: 'Client Alpha',
    deadline: '2024-06-30',
    techStack: 'React, Node.js',
    extraDetails: 'Extra details about Project Alpha'
  },
  // Add more projects here
];

const ProjectList = ({projects}) => {
  const project = [projects]
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <ul>
          {project.map(proj => {
            return(<li key={project.id} className="mb-4 border-b pb-4">
            <h3 className="text-xl font-semibold">{proj.projectName}</h3>
            <p>{proj.description}</p>
            <Link to={`/project/${proj.$id}`} className="text-indigo-500 hover:underline">View Project</Link>
          </li>)
        })}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
