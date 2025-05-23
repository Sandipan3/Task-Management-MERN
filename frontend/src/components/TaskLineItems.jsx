import React from "react";
import { Link } from "react-router-dom";

const TaskLineItems = ({ taskid, title, completed, deadline, remindAt }) => {
  return (
    <div className="border border-b-2 m-4 p-2 bg-slate-400">
      <Link to={`/tasks/${taskid}`}>
        <li>{title}</li>
        <li>{completed}</li>
        <li>{deadline}</li>
        <li>{remindAt}</li>
      </Link>
    </div>
  );
};

export default TaskLineItems;
