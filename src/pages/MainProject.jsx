import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faCheck, faProjectDiagram, faFileAlt, faCalendarAlt, faUser, faTasks, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { database, ID  } from '../Backend';
import Loader from '../components/Loader'
import { Query } from 'appwrite';

const MainProjectPage = () => {
  const [projects, setProjects] = useState([
  ]);
   const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientDetails, setClientDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const [techStack, setTechStack] = useState('');
  const [extraDetails, setExtraDetails] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  useEffect(()=>{
    setLoading1(true)
    database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_PROJECT_CL,
      [
        Query.select(['$id','projectName', 'description'])
      ]
    )
    .then((Res)=>{
      setProjects(Res.documents)
      setLoading1(false)
    }).catch((res)=>{
      setLoading(false)
    })
  },[])

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProject = {
      projectName:name,
      description,
      clientDetail:clientDetails,
      deadline,
      teckStack:techStack,
      extraDetail:extraDetails,
      status,
    };

    setLoading(true);

    const docId = ID.unique()
    database
      .createDocument(import.meta.env.VITE_DB_ID, import.meta.env.VITE_PROJECT_CL, docId, newProject)
      .then(response => {
        setLoading(false)
        setMessage('Project added successfully.');
        // setName(''); // Clear the input field
        setTimeout(()=>{
          clearForm();
          setShowModal(false);
          setMessage("")
    
        },3000)
      })
      .catch(error => {
        setLoading(false)
        console.error('Error creating document:', error);
        setMessage('Failed to add Project.');
      })
      .finally(() => {
        setLoading(false); 
      });

    
    setProjects([...projects, newProject]);
  
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setClientDetails('');
    setDeadline('');
    setTechStack('');
    setExtraDetails('');
    setStatus('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center">
          <FontAwesomeIcon icon={faProjectDiagram} className="mr-2 text-indigo-500" /> Projects
        </h1>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create New Project
        </button>
      </div>
      
      {loading1 ?<div className='flex justify-center items-center mt-5'>
        <Loader />
      </div>:
      <div>
      {Object.keys(projects).length === 0 ?<Loader /> :projects.map((ele)=><ProjectList projects={ele} />) }
      </div>}
    

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative animate__animated animate__fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-indigo-700 flex items-center">
              <FontAwesomeIcon icon={faProjectDiagram} className="mr-2 text-indigo-500" /> Create New Project
            </h2>
            <form onSubmit={handleCreateProject}>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-500" /> Project Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-green-500" /> Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="1"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-red-500" /> Client Details
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={clientDetails}
                  onChange={(e) => setClientDetails(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-purple-500" /> Deadline
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faLayerGroup} className="mr-2 text-orange-500" /> Tech Stack
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-pink-500" /> Extra Details
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  rows="1"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faTasks} className="mr-2 text-teal-500" /> Project Status
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-between items-center gap-1">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" /> {loading ? <Loader />:"Create Project"}
                </button>
                {message&&<p className='text-green-500'> {message}</p>}
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-4"
                  onClick={() => {
                    setShowModal(false);
                    clearForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainProjectPage;
