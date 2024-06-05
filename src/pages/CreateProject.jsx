// src/components/CreateProject.js
import React, { useState } from 'react';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const [techStack, setTechStack] = useState('');
  const [extraDetails, setExtraDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save project details (e.g., send to backend)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Client Details</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={clientDetails}
              onChange={(e) => setClientDetails(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Deadline</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tech Stack</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Extra Details</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
