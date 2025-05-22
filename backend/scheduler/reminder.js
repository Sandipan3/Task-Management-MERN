import axios from "axios";
import cron from "node-cron";

export function startreminderCron(start) {
  console.log("job scheduled");
  if (start) {
    cron.schedule("30 21 * * *", async () => {
      try {
        console.log("we are now in try block");
        await axios.post(
          "http://localhost:3000/reminder/send-deadline-reminders?taskName=scheduler"
        );
        console.log("schedule end");
      } catch (error) {
        console.error("Cron Error : ", error);
      }
    });
  }
}
