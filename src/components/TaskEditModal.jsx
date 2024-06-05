// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTasks, faFileAlt, faUser, faCalendarAlt, faExclamationTriangle, faInfoCircle, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
// import { database,databaseId, taskCollectionId } from "../Backend";

// const TaskEditModal = ({ task, onClose, onEdit }) => {
//   console.log('heer')
//   const [editedTask, setEditedTask] = useState({ ...task });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(databaseId)
//     const {project, taskName ,description,assigneeEmail,deadline,status,priority,$id} = editedTask
//     console.log(editedTask)
//     database.updateDocument(databaseId,taskCollectionId,$id,{project, taskName ,description,assigneeEmail,deadline,status,priority})
//     .then((res)=>{
//       alert('updated sucess fully')
//       setTimeout(()=>{
//         onEdit(editedTask);
//       },2000)
//     }).catch((err)=>{
//       alert('there is error in saving')
//     })
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl">
//         <h2 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center">
//           <FontAwesomeIcon icon={faTasks} className="mr-2 text-indigo-500" /> Edit Task
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-500" /> Project Name
//             </label>
//             <input
//               type="text"
//               name="projectName"
//               value={editedTask.project}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-green-500" /> Task Name
//             </label>
//             <input
//               type="text"
//               name="taskName"
//               value={editedTask.taskName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faUser} className="mr-2 text-red-500" /> Assignee Email
//             </label>
//             <input
//               type="email"
//               name="assigneeEmail"
//               value={editedTask.assigneeEmail}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-purple-500" /> Deadline
//             </label>
//             <input
//               type="date"
//               name="deadline"
//               value={editedTask.deadline}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-orange-500" /> Priority
//             </label>
//             <select
//               name="priority"
//               value={editedTask.priority}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-teal-500" /> Status
//             </label>
//             <select
//               name="status"
//               value={editedTask.status}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="Not Started">Not Started</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 flex items-center">
//               <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-pink-500" /> Description
//             </label>
//             <textarea
//               name="description"
//               value={editedTask.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               className="text-gray-600 px-4 py-2 rounded border border-gray-400 hover:bg-gray-200 flex items-center"
//               onClick={onClose}
//             >
//               <FontAwesomeIcon icon={faTimes} className="mr-2" /> Close
//             </button>
//             <button
//               type="submit"
//               className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center"
//             >
//               <FontAwesomeIcon icon={faSave} className="mr-2" /> Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskEditModal;
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faFileAlt, faUser, faCalendarAlt, faExclamationTriangle, faInfoCircle, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { database } from "../Backend";
import { Query } from "appwrite";
import { useParams,useNavigate } from "react-router-dom";
import Loader from '../components/Loader';

const TaskEditModal = ({ onClose, onEdit }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [updatingLoader, setUpdatingLoader] = useState(false)
  const [message,setMessage] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    database.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_TASK_CL, [Query.equal('$id', taskId)])
      .then((res) => {
        setLoading(false);
        setTask(res.documents[0]); 
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const [editedTask, setEditedTask] = useState({}); // Initialize with an empty object

  useEffect(() => {
    setEditedTask(task);
  }, [task]); // Update editedTask when task changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setUpdatingLoader(true)
    e.preventDefault();
    const { project, taskName, description, assigneeEmail, deadline, status, priority, $id } = editedTask;
    database.updateDocument(import.meta.env.VITE_DB_ID, import.meta.env.VITE_TASK_CL, $id, { project, taskName, description, assigneeEmail, deadline, status, priority })
      .then((res) => {
        setUpdatingLoader(false)
        setMessage("updated sucesfully")
        setTimeout(()=>{
          navigate('/task')
        },2000)

      })
      .catch((err) => {
        setUpdatingLoader(false)
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center">
        <FontAwesomeIcon icon={faTasks} className="mr-2 text-indigo-500" /> Edit Task
      </h2>
     {loading? <div className="flex justify-center items-center">
        <Loader />
      </div>:
      <div>
        {Object.keys(editedTask).length!==0 && <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-500" /> Project Name
          </label>
          <input
            type="text"
            name="project"
            value={editedTask.project}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-green-500" /> Task Name
          </label>
          <input
            type="text"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-red-500" /> Assignee Email
          </label>
          <input
            type="email"
            name="assigneeEmail"
            value={editedTask.assigneeEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-purple-500" /> Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-orange-500" /> Priority
          </label>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-teal-500" /> Status
          </label>
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-pink-500" /> Description
          </label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            disabled={updatingLoader}
            className="text-gray-600 px-4 py-2 rounded border border-gray-400 hover:bg-gray-200 flex items-center mr-2"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" /> Close
          </button>
          {message&&<p className="text-green-500 ">{message}</p>}
          <button
            type="submit"
            disabled={updatingLoader}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" /> {updatingLoader?<Loader />:"Save Changes"}
          </button>
        </div>
      </form>}
      
      </div>}
    </div>
  );
};

export default TaskEditModal;
