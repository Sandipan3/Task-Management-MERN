import { sendEmail } from "../services/emailService.js";
import express from "express";
import Task from "../models/Task.js";

export const router = express.Router();

router.post("/send-deadline-reminders", async (req, res) => {
  try {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 1. user id match
    // 2. Date less than tomorrow < 24 hours (All completed as well as pending tasks  )
    // 3. completed = false  Filter out all completed tasks and considering all pending tasks

    const tasks = await Task.find({
      $and: [
        //{ userId: req.user._id },
        { completed: false },
        { deadline: { $lt: tomorrow } },
      ],
    });

    await tasks.forEach(async (task) => {
      const userEmail = task.userId.email;
      const message = `
        <h3>⏰ Task Reminder</h3>
        <p>Your task <strong>"${
          task.title
        }"</strong> is due by <strong>${new Date(
        task.deadline
      ).toLocaleString()}</strong>.</p>
        <p>Please complete it on time.</p>
      `;
      await sendEmail(
        userEmail,
        `Reminder: ${task.title} deadline approaching`,
        message
      );
    });
    return res
      .status(200)
      .json({ messag: `Reminder sent for ${tasks.length} tasks` });
  } catch (error) {
    return res
      .status(200)
      .json({ messag: `Reminder sent for ${tasks.length} tasks` });
  }
});
