import { sendEmail } from "../services/emailService.js";
import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const router = express.Router();

router.post("/send-deadline-reminders", async (req, res) => {
  try {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const taskName = req.query.taskName ? req.query.taskName : "Manual";
    // 1. user id match
    // 2. Date less than tomorrow < 24 hours (All completed as well as pending tasks  )
    // 3. completed = false  Filter out all completed tasks and considering all pending tasks

    const tasks = await Task.find({
      $and: [{ completed: false }, { deadline: { $lt: tomorrow } }],
    });

    tasks.forEach(async (task) => {
      //find email
      const user = await User.findOne({ _id: task.userId });

      if (user.email) {
        await sendEmail(
          user.email,
          `Reminder: ${task.title + "-" + taskName} deadline approaching`,
          `<h3>⏰ Task Reminder</h3>
        <p>Your task <strong>"${
          task.title
        }"</strong> is due by <strong>${new Date(
            task.deadline
          ).toLocaleString()}</strong>.</p>
        <p>Please complete it on time.</p>`
        );
      }
    });
    return res
      .status(200)
      .json({ messag: `Reminder sent for ${tasks.length} tasks` });
  } catch (error) {
    return res.status(400).json({ messag: `Reminder sent error`, error });
  }
});
