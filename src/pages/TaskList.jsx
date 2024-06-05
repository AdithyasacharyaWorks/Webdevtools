import React, { useState } from 'react';
import { RiEdit2Line } from 'react-icons/ri'; // Importing colorful edit icon
import { AiFillClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'; // Importing colorful status icons
import TaskEditModal from '../components/TaskEditModal'; // Assuming TaskEditModal is in a separate file
import { FaExclamationCircle } from 'react-icons/fa'; // Importing big size warning icon
import { useParams, useNavigate } from 'react-router-dom';

const TaskList = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    closeModal();
  };

  // Function to determine status icon
  const statusIcon = (status) => {
    switch (status) {
      case 'Not Started':
        return <AiOutlineCloseCircle className="text-red-500" />;
      case 'In Progress':
        return <AiFillClockCircle className="text-yellow-500" />;
      case 'Completed':
        return <AiOutlineCheckCircle className="text-green-500" />;
      case 'Cancelled':
        return <AiOutlineCloseCircle className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg shadow hover:rounded-3xl hover:bg-gray-50  mb-4 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="flex flex-col md:flex-row w-full">
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2 hover:text-indigo-700">{task.taskName}</h2>
                <div className="flex justify-between mb-2">
                  <p><strong>Task ID:</strong> {task.id}</p>
                  <p><strong>Project:</strong> {task.project}</p>
                </div>
                <div className="flex justify-between">
                  <p><strong>Assigned To:</strong> {task.assigneeEmail}</p>
                  <p className='flex gap-1 items-center'>
                    <strong>Status:</strong>
                    <span className="ml-1">
                      {statusIcon(task.status)}
                    </span>
                    <span>{task.status}</span>
                  </p>
                </div>
                <p><strong>Description:</strong> {task.description}</p>
              </div>
              <button
                className="text-blue-500 cursor-pointer md:ml-4 mt-2 md:mt-0 hover:scale-150"
                onClick={() =>navigate(`/tasks/${task.$id}/edit`)}
              >
                <RiEdit2Line size={24} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
          <p className="text-lg text-gray-600">No tasks found with the selected filter combination.</p>
        </div>
      )}
      {/* Modal for editing task */}
      {/* {isModalOpen && (
        <TaskEditModal
          task={selectedTask}
          onClose={closeModal}
          onEdit={handleEditTask}
        />
      )} */}
    </div>
  );
};

export default TaskList;
