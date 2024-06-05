import React, { useState, useEffect } from 'react';
import { database, ID } from '../Backend';
import Loader from '../components/Loader'
import { Query } from 'appwrite';
const Task = ({ handleClose }) => {
  // const projects = [
  //   { id: 1, name: 'Project Alpha' },
  //   { id: 2, name: 'Project Beta' },
  //   { id: 3, name: 'Project Gamma' },
  // ];
  const [ projects,setProjects ]= useState([])
  const [loadingProject,setLoadingProject] = useState(false)

  const fetchProjects = () =>{
    database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_PROJECT_CL,
      [
        Query.select(['$id','projectName'])
      ]).then((res)=>{
        setProjects(res.documents)
      }).catch((err)=>{
        alert("error fetching projects")
      })
  }

  useEffect(()=>{
    fetchProjects()
  },[])
  //add project 

  
  const [taskName, setTaskName] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')



  const cancelValues = () =>{
    setAssigneeEmail("")
    setDeadline("")
    setDescription("")
    setPriority("")
    setTaskName("")
    setStatus("")
    setSelectedProject("")
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const docId = ID.unique()
    const dataTask= {
      taskName,
      assigneeEmail,
      deadline,
      status,
      priority,
      description,
      project: selectedProject,
    };
    setLoader(true);

    database
      .createDocument(import.meta.env.VITE_DB_ID, import.meta.env.VITE_TASK_CL, docId, dataTask)
      .then(response => {
        setLoader(false)
        setMessage('Task added successfully.');
        cancelValues();
        setTimeout(()=>{handleClose();},2000)
        // setName(''); // Clear the input field
      })
      .catch(error => {
        setLoader(false)
        setMessage('Failed to add Task.');
      })
      .finally(() => {
        setLoader(false); 
      });


  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="max-w-lg w-full bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-2 text-indigo-700">Add Task to Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Project</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.$id} value={project.projectName}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Task Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="1"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Assignee Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={assigneeEmail}
              onChange={(e) => setAssigneeEmail(e.target.value)}
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
            <label className="block text-gray-700">Status</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              disabled={loader}
            >
              { loader ?<Loader />:"Add Task"}
            </button>
            {message && <p className='text-green-500'>{message}</p>}
            <button
              type="button"
              className="text-gray-600 px-4 py-2 rounded border border-gray-400 hover:bg-gray-200"
              onClick={handleCancel}
              disabled={loader}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Task;
