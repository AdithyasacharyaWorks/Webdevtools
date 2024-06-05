import React from 'react';
import { useParams } from 'react-router-dom';
import TaskEditModal from '../components/TaskEditModal'; // Assuming TaskEditModal is in a separate file

const TaskEditRoute = () => {
  const { taskId } = useParams(); // Get the taskId from URL params

  return (
    <TaskEditModal  onEdit={()=>{}} taskId={taskId} />
  );
};

export default TaskEditRoute;
