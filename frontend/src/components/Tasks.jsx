// all tasks based on user
import React from "react";
import TaskLineItems from "./TaskLineItems";
import { Link } from "react-router-dom";

const Tasks = () => {
  const tasks = [
    {
      _id: "681a51d3e9e4f6ac93ab2a16",
      title: "task1",
      completed: "false",
      deadline: "2025-05-15T00:00:00.000Z",
      remindAt: "2025-05-14T00:00:00.000Z",
      userId: {
        $oid: "6814fc17de0cef2c8a0ab996",
      },
      __v: 0,
    },
    {
      _id: "681a51d3e9e4f6ac93ab2a17",
      title: "task2",
      completed: "false",
      deadline: "2025-05-15T00:00:00.000Z",
      remindAt: "2025-05-14T00:00:00.000Z",
      userId: {
        $oid: "6814fc17de0cef2c8a0ab996",
      },
      __v: 0,
    },
  ];

  console.log(tasks[0]._id);
  console.log(tasks[1]._id);

  return (
    <div>
      <ul>
        {tasks.map((task) => (<TaskLineItems
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
    </div>
  );
};

export default Tasks;
