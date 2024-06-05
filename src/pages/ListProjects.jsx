import React, { useState } from 'react';
import { FaFlag, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';

const projectData = [
  {
    id: 1,
    name: 'Increase paying customer by 100%',
    state: 'Backlog',
    status: 'Not Started',
    assignee: 'John Doe',
    project: 'Project A',
    description: 'This project is aimed at increasing paying customers by 100%',
    deadline: '2023-12-31',
    techStack: 'Full Stack',
    clientDetails: 'Client A',
  },
  {
    id: 2,
    name: 'Redesign & launch updated mobile app',
    state: 'Backlog',
    status: 'Not Started',
    assignee: 'Jane Doe',
    project: 'Project B',
    description: 'This project focuses on redesigning and launching the updated mobile app',
    deadline: '2024-01-15',
    techStack: 'Frontend',
    clientDetails: 'Client A',
  },
  {
    id: 3,
    name: 'Set up lead generation campaign tracking',
    state: 'On Track',
    status: 'In Progress',
    assignee: 'John Doe',
    project: 'Project C',
    description: 'Setting up tracking for lead generation campaigns',
    deadline: '2024-02-20',
    techStack: 'Backend',
    clientDetails: 'Client A',
  },
  {
    id: 4,
    name: 'Run launch and ad campaign for new mobile app',
    state: 'On Track',
    status: 'In Progress',
    assignee: 'Jane Doe',
    project: 'Project A',
    description: 'Running launch and ad campaigns for the new mobile app',
    deadline: '2024-03-10',
    techStack: 'Full Stack',
    clientDetails: 'Client A',
  },
  {
    id: 5,
    name: 'Increase site traffic by 60%',
    state: 'Achieved',
    status: 'Completed',
    assignee: 'John Doe',
    project: 'Project B',
    description: 'Increasing the site traffic by 60%',
    deadline: '2023-11-30',
    techStack: 'Frontend',
    clientDetails: 'Client A',
  },
  {
    id: 6,
    name: 'Launch an outside sales team',
    state: 'Achieved',
    status: 'Completed',
    assignee: 'Jane Doe',
    project: 'Project C',
    description: 'Launching an outside sales team',
    deadline: '2024-04-15',
    techStack: 'Backend',
    clientDetails: 'Client A',
  },
  {
    id: 7,
    name: 'Receive >95% positive customer reviews in app store',
    state: 'Failed',
    status: 'Cancelled',
    assignee: 'John Doe',
    project: 'Project A',
    description: 'Receiving more than 95% positive customer reviews in the app store',
    deadline: '2024-05-01',
    techStack: 'Full Stack',
    clientDetails: 'Client A',
  },
];

function ProjectList() {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterProject, setFilterProject] = useState('');

  const filteredProjects = projectData.filter(
    (project) =>
      (filterStatus === '' || project.status === filterStatus) &&
      (filterAssignee === '' || project.assignee === filterAssignee) &&
      (filterProject === '' || project.project === filterProject)
  );

  const renderProject = (project) => {
    let stateColor;
    switch (project.state) {
      case 'Backlog':
        stateColor = 'bg-yellow-200';
        break;
      case 'On Track':
        stateColor = 'bg-blue-200';
        break;
      case 'Achieved':
        stateColor = 'bg-green-200';
        break;
      case 'Failed':
        stateColor = 'bg-red-200';
        break;
      default:
        stateColor = 'bg-gray-200';
    }

    return (
      <Link key={project.id} to={`/project/${project.id}`}>
        <div className={`flex justify-between items-center p-2 mb-2 rounded-md shadow-md ${stateColor}`}>
          <div>
            <h3 className="font-bold">{project.name}</h3>
            <p className="text-sm">{project.status}</p>
            <p className="text-sm">{project.project}</p>
          </div>
          <div className="flex items-center">
            <FaUserCircle className="mr-2 text-xl" />
            <span>{project.assignee}</span>
            <FaFlag className="ml-4 text-red-500" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg relative">
      <h1 className="text-3xl font-bold mb-6">Company Goals and Milestones</h1>
      <div className="flex mb-4 ">
        <div className="mr-4 w-1/3 ">
          <label htmlFor="filterStatus" className="block font-bold mb-2">Filter by Status</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          >
            <option value="">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mr-4 w-1/3">
          <label htmlFor="filterAssignee" className="block font-bold mb-2">Filter by Assignee</label>
          <select
            id="filterAssignee"
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          >
            <option value="">All</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Doe">Jane Doe</option>
          </select>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Not Started</h2>
        {filteredProjects.filter((project) => project.status === 'Not Started').map(renderProject)}
      </div>
      <div>
        <h2 className="font-bold text-lg mt-4 mb-2">In Progress</h2>
        {filteredProjects.filter((project) => project.status === 'In Progress').map(renderProject)}
      </div>
      <div>
        <h2 className="font-bold text-lg mt-4 mb-2">Completed</h2>
        {filteredProjects.filter((project) => project.status === 'Completed').map(renderProject)}
      </div>
      <div>
        <h2 className="font-bold text-lg mt-4 mb-2">Cancelled</h2>
        {filteredProjects.filter((project) => project.status === 'Cancelled').map(renderProject)}
      </div>
    </div>
  );
}

export default ProjectList;