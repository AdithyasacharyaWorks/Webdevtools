import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCardMain = ({ tool }) => {
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <h3 className="text-xl font-bold mb-2 text-indigo-700">{tool?.toolName}</h3>
      <p className="text-gray-600 mb-4">{tool?.detail}</p>
      <div className="flex flex-wrap mb-4">
        {tool?.category && tool?.category.split(',').map((category, index) => (
          <span key={index} className="bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">{category}</span>
        ))}
      </div>
      <a href={tool?.webUrl} target="_blank" rel="noopener noreferrer" className="block text-center bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition-colors flex items-center justify-center">
        Visit <FaExternalLinkAlt className="ml-2" />
      </a>
    </div>
  );
};

export default ProjectCardMain;
