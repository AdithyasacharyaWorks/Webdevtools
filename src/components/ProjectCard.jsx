import React from 'react';

const ProjectCard = ({ name }) => {
  const handleClick = (route) => {
    window.location.href = `/${route}`;
  };

  let route;
  switch (name) {
    case "Create project":
      route = "addProject";
      break;
    case "Project List":
      route = "listProjects";
      break;
    case "Manage Projects":
      route = "manageProjects";
      break;
    default:
      route = "";
  }

  return (
    <div 
      className="group duration-500 hover:-skew-x-0 skew-x-6 hover:translate-x-2 cursor-pointer"
      onClick={() => handleClick(route)}
    >
      <div className="group-hover:duration-400 relative rounded-2xl w-72 h-36 bg-blue-500 text-white flex flex-col justify-center items-center gap-1 before:-skew-x-12 before:rounded-2xl before:absolute before:content[''] before:bg-neutral-700 before:right-3 before:top-0 before:w-72 before:h-32 before:-z-10">
        <p className="text-white ">{name}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
