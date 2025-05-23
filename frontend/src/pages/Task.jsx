//TODO: Single Task Detail from Home page when a specific task is clicked based on :id
// User must be authorized with bearer token

import { useParams } from "react-router-dom";

const Task = () => {
  console.log("inside task.jsx");

  const { taskid } = useParams();
  console.log(taskid);

  return (
    <div>
      Task <p>{taskid}</p>
    </div>
  );
};

export default Task;
