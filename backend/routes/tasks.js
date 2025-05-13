import express from "express";
import Task from "../models/Task.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import { check, validationResult } from "express-validator";

export const router = express.Router();

router.use(authMiddleWare); //protect all routes

//get all updatedTask
router.get("/", async (req, res) => {
  try {
    const updatedTask = await Task.find({ userId: req.user._id });
    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      message: "Task fetching failed",
    });
  }
});

//create a new task
router.post(
  "/",
  [
    check("title", "Title is empty").not().isEmpty(),
    check("completed", "Completed is empty").not().isEmpty(),
    check("deadline", "Deadline is empty").isDate(),
    check("remindAt", "remindAt is empty").isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { title, completed, deadline, remindAt } = req.body;

      //const {username} = req.body; // can be email or username
      //const userKey = username ? username : ()=>{const {email} = req.body; return email}
      //console.log(userKey);

      const task = new Task({
        title,
        completed,
        deadline,
        remindAt,
        userId: req.user._id,
      });

      const updatedTask = await task.save();
      return res.status(201).json({
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Task creation failed",
      });
    }
  }
);

//update a task(partial)
router.patch(
  "/:id",
  [
    check("title", "Title is empty").not().isEmpty(),
    check("completed", "Completed is empty").not().isEmpty(),
    check("deadline", "Deadline is empty").isDate(),
    check("remindAt", "remindAt is empty").isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const taskId = req.params.id;
      console.log("Received Task id : " + taskId);

      //const updatedTask = await Task.findOneAndUpdate({ _id: taskId }
      //     ,(JSON.stringify(req.user._id) != JSON.stringify(updatedTask.userId))? req.body, {
      //     new: true,
      //   });

      console.log("updatedTask.js User found from token : " + req.user._id);

      const task = await Task.findOne({
        $and: [{ userId: req.user._id }, { _id: taskId }],
      });

      console.log("Task found: " + JSON.stringify(task));

      if (task) {
        const updatedTask = await Task.findOneAndUpdate(
          { _id: taskId },
          req.body,
          {
            new: true,
          }
        );
        console.log("Task updated ");

        if (!updatedTask) {
          return res.status(500).json({
            message: "Update error",
          });
        }

        console.log("Now returnning response to UI");
        console.log(updatedTask);

        return res.status(200).json({ updatedTask });
      } else {
        return res.status(403).json({
          message: "You don't have access to this.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Task update failed",
      });
    }
  }
);

//delete a task
router.delete("/:id", async (req, res) => {
  try {
    //retrieve the id from params
    const taskId = req.params.id;

    const task = await Task.findOne({
      $and: [{ userId: req.user._id }, { _id: taskId }],
    });

    if (task) {
      const deletedTask = await Task.findOneAndDelete({ _id: taskId });

      if (!deletedTask) {
        return res.status(500).json({
          message: "Deletion error",
        });
      }

      console.log(deletedTask);

      return res.status(200).json({
        message: "Task deleted successfully",
        deletedTask,
      });
    } else {
      return res.status(500).json({
        message: "You don't have access to this",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Task deletion failed",
    });
  }
});

//delete error for no id
router.delete("/", (req, res) => {
  return res.status(404).json({
    message: "Id not found",
  });
});
