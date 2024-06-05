import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaProjectDiagram, FaTasks, FaUser, FaUserTie, FaCode, FaEdit } from 'react-icons/fa';

function AddProject() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectState, setProjectState] = useState('');
  const [deadline, setDeadline] = useState('');
  const [techStack, setTechStack] = useState('');
  const [status, setStatus] = useState('');
  const [assignee, setAssignee] = useState('');
  const [projectNameDetail, setProjectNameDetail] = useState('');
  const [clientDetails, setClientDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjectName('');
    setDescription('');
    setProjectState('');
    setDeadline('');
    setTechStack('');
    setStatus('');
    setAssignee('');
    setProjectNameDetail('');
    setClientDetails('');
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 flex items-center text-indigo-600">
        <FaPlus className="mr-3" /> Add New Project
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="projectName" className="block font-bold mb-2 text-gray-700">Project Name</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaEdit className="mr-3 text-indigo-500" />
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block font-bold mb-2 text-gray-700">Description</label>
          <div className="flex items-start border border-gray-300 p-2 rounded-md">
            <FaEdit className="mr-3 mt-1 text-indigo-500" />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none"
              rows="4"
              required
            ></textarea>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="projectState" className="block font-bold mb-2 text-gray-700">Project State</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaTasks className="mr-3 text-indigo-500" />
            <input
              type="text"
              id="projectState"
              value={projectState}
              onChange={(e) => setProjectState(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="deadline" className="block font-bold mb-2 text-gray-700">Deadline</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaCalendarAlt className="mr-3 text-indigo-500" />
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="techStack" className="block font-bold mb-2 text-gray-700">Tech Stack</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaCode className="mr-3 text-indigo-500" />
            <input
              type="text"
              id="techStack"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="status" className="block font-bold mb-2 text-gray-700">Status</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaTasks className="mr-3 text-indigo-500" />
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full outline-none"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="assignee" className="block font-bold mb-2 text-gray-700">Assignee</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaUser className="mr-3 text-indigo-500" />
            <input
              type="text"
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="projectNameDetail" className="block font-bold mb-2 text-gray-700">Project</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaProjectDiagram className="mr-3 text-indigo-500" />
            <input
              type="text"
              id="projectNameDetail"
              value={projectNameDetail}
              onChange={(e) => setProjectNameDetail(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="clientDetails" className="block font-bold mb-2 text-gray-700">Client Details</label>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaUserTie className="mr-3 text-indigo-500" />
            <input
              type="text"
              id="clientDetails"
              value={clientDetails}
              onChange={(e) => setClientDetails(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <FaPlus className="mr-3" /> Add Project
        </button>
      </form>
    </div>
  );
}

export default AddProject;
