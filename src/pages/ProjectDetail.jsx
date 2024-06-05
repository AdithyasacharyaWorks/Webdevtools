import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaTasks, FaProjectDiagram, FaCheck, FaEdit, FaEraser } from 'react-icons/fa';
import { database } from '../Backend';
import { Query } from 'appwrite';
import Loader from '../components/Loader'


function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const project = projectData.find((p) => p.id === parseInt(id));
  const [project,setProject] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading1,setLoading1] = useState(false)
  const [message, setMessage] = useState("")


  useEffect(()=>{
    setLoading(true)
    database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_PROJECT_CL,[
      Query.equal('$id', id),
  ]).then((res)=>{
    setLoading(false)
    setProject(res.documents)
    setTheValues(res.documents);
  }).catch((err)=>{
    setLoading(false)
  })
  },[])

  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState();
  const [techStack, setTechStack] = useState();
  const [status, setStatus] = useState();
  const [assignee, setAssignee] = useState();
  const [clientDetails, setClientDetails] = useState();
  const [extraDetails, setExtraDetails] = useState();


  const setTheValues = (project1) =>{
    setProjectName(project1[0]?.projectName)
    setDescription(project1[0]?.description)
    setDeadline(project1[0]?.deadline)
    setTechStack(project1[0]?.teckStack)
    setStatus(project1[0]?.status)
    setClientDetails(project1[0]?.clientDetail)
    setExtraDetails(project1[0]?.extraDetail)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData =  {
      projectName,
      description,
      deadline,
      status,
      clientDetail:clientDetails,
      extraDetail:extraDetails,
      teckStack:techStack


    }
    setLoading(true);
    database.updateDocument(import.meta.env.VITE_DB_ID,import.meta.env.VITE_PROJECT_CL,id,updatedData)
    .then((res)=>{
      setLoading1(false);
      setMessage("Updated succesfully")
      alert("Updated succesfully")
      navigate('/projects');
    }).catch((err)=>{
      setLoading1(false);
      setMessage('there is error in updating');
      alert("there is error in updating")
    })
  };

  return (
    <div>
      <div className='flex justify-center items-center'>{loading&&<Loader />}</div>
      
    {!loading && <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg animate__animated animate__fadeIn">
      <h1 className="text-4xl font-bold mb-6 flex items-center text-indigo-700">
        <FaEdit className="mr-2" /> Edit Project
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="projectName" className="block font-bold mb-2 text-gray-700">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2 text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block font-bold mb-2 text-gray-700">Deadline</label>
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
            <FaCalendarAlt className="mr-2 text-green-500" />
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="techStack" className="block font-bold mb-2 text-gray-700">Tech Stack</label>
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
            <FaProjectDiagram className="mr-2 text-purple-500" />
            <input
              type="text"
              id="techStack"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-bold mb-2 text-gray-700">Project Status</label>
          <div className="flex items-center border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
            <FaTasks className="mr-2 text-blue-500" />
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      
        <div className="mb-4">
          <label htmlFor="clientDetails" className="block font-bold mb-2 text-gray-700">Client Details</label>
          <input
            type="text"
            id="clientDetails"
            value={clientDetails}
            onChange={(e) => setClientDetails(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="extraDetails" className="block font-bold mb-2 text-gray-700">Extra Details</label>
          <textarea
            id="extraDetails"
            value={extraDetails}
            onChange={(e) => setExtraDetails(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            rows="4"
          ></textarea>
        </div>
        <div className='flex justify-between items-center '>
      
        <button
          onClick={()=>navigate('/projects')}
          disabled={loading1}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
        >
          <FaEraser className="mr-2" /> cancel
        </button>
        {message&&<p className='text-green-500'>{message}</p>}
        <button
          type="submit"
          disabled={loading1}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <FaCheck className="mr-2" /> {loading1 ? <Loader />:"Save Changes"}
        </button>
        </div>
      </form>
    </div>}
    </div>
  );
}

export default ProjectDetail;
