// all tasks based on user

import { useEffect, useState } from "react";
import axios from "axios";
import TaskLineItems from "./TaskLineItems";
import tokenUtil from "../../util/tokenUtil";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks", {
        headers: {
          // authorization: `bearer ${tokenUtil.getLocalStorageToken()}`,
          "x-auth-token": `${tokenUtil.getLocalStorageToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("[Tasks.jsx]==========");
        console.log(res.data);
        console.log(tasks);
        console.log("==========");
        setTasks(res.data);
      });
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-4xl">Your Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-3xl"></p>
      ) : (
        <ul className="bg-blue-100 rounded-md shadow-sm flex-1 my-4 mx-auto p-2">
          {tasks.map((task) => (
            <TaskLineItems
              key={task._id}
              taskid={task._id}
              title={task.title}
              completed={task.completed}
              deadline={task.deadline}
              remindAt={task.remindAt}
            />
          ))}
          {/* <TaskLineItems
          taskid={tasks[0]._id}
          title={tasks[0].title}
          completed={tasks[0].completed}
          deadline={tasks[0].deadline}
          remindAt={tasks[0].remindAt}
        /> */}
        </ul>
      )}
    </div>
  );
};

export default Tasks;

// fix for empty if availiable display your tasks
