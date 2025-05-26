import { Link } from "react-router-dom";

const TaskLineItems = ({ taskid, title, completed, deadline, remindAt }) => {
  const classNames =
    completed === "true"
      ? "bg-green-200 text-green-800"
      : "bg-red-200 text-red-800";

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div
      className={`border border-b-2 rounded-lg m-4 p-2 ${classNames} shadow-md`}
    >
      <Link to={`/tasks/${taskid}`} className="block">
        <h3 className="text-2xl font-bold">{capitalize(title)}</h3>
        <div className="flex flex-col text-sm gap-5 sm:flex-row">
          <p>Deadline: {new Date(deadline).toLocaleString()}</p>
          <p>Remind At: {new Date(remindAt).toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default TaskLineItems;
