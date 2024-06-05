import React, { useState,useEffect } from 'react';
import TaskList from './TaskList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Task from './Task'; // Import the Task component
import { database } from '../Backend';
import Loader from '../components/Loader'


const MainTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
    database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_TASK_CL)
    .then((Res)=>{
      setTasks(Res.documents)
      setLoading(false)
      }
    ).catch((err)=>{
      setLoading(false)
      alert(err)
    })
  },[])

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAssigneeChange = (e) => {
    setSelectedAssignee(e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (selectedAssignee === '' || task.assigneeEmail === selectedAssignee) &&
      (selectedProject === '' || task.project === selectedProject) &&
      (selectedStatus === '' || task.status === selectedStatus)
    );
  });

  const uniqueAssignees = [...new Set(tasks.map((task) => task.assigneeEmail))];
  const uniqueProjects = [...new Set(tasks.map((task) => task.project))];
  const uniqueStatuses = [...new Set(tasks.map((task) => task.status))];


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Tasks</h1>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center"
          onClick={handleAddTask}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Task
        </button>
      </div>

      {!loading && <div className="flex mb-4">
        <select
          className="mr-4 p-2 border rounded"
          value={selectedAssignee}
          onChange={handleAssigneeChange}
        >
          <option value="">All Assignees</option>
          {uniqueAssignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>

        <select
          className="mr-4 p-2 border rounded"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option value="">All Projects</option>
          {uniqueProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      }

      {loading?<div className='flex justify-center items-center'>
        <Loader />
      </div>:
      <TaskList tasks={filteredTasks} />}

      {/* Modal for adding new task */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Add Task</h2>
            <Task onSubmit={handleSubmit} handleClose={handleCloseModal} />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-4"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                onClick={() => setShowModal(false)}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTaskPage;
