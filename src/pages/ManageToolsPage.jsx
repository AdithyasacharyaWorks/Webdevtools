import React, { useState } from 'react';
import Button from '../components/Button';
import Button2 from '../components/Button2';

function ManageToolsPage() {
  const [tools, setTools] = useState([
    // Sample data
    { id: 1, title: 'React', detail: 'JavaScript library for building user interfaces', category: 'JavaScript', label: 'Library', url: 'https://reactjs.org' },
    // Add more tools here
  ]);

  const deleteTool = (id) => {
    setTools(tools.filter(tool => tool.id !== id));
  };

  const updateTool = (id, updatedTool) => {
    setTools(tools.map(tool => tool.id === id ? updatedTool : tool));
  };

  return (
    <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Manage Tools Added</h2>
    <div className="space-y-6">
      {tools.map((tool) => (
        <div key={tool.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold mb-2 text-blue-500">{tool.title}</h3>
          <p className="text-gray-600 mb-4">{tool.detail}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">{tool.category}</span>
            <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm font-medium">{tool.label}</span>
          </div>
          <divm className="flex justify-between items-center">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">Visit</a>
            <div className='flex gap-3'>
              {/* <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors">Delete</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">Update</button> */}
              <Button2 name={"Delete"} color={"red"} />
              <Button2 name={"Update"} color={"blue"}/>
            </div>
          </divm>
        </div>
      ))}
    </div>
  </div>
  );
}

export default ManageToolsPage;