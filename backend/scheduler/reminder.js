import axios from "axios";
import cron from "node-cron";

// export function startreminrCron() {

// }
cron.schedule("12 0 * * *", async () => {
  try {
    console.log("schedule start");
    await axios.post("http://localhost:3000/reminder/send-deadline-reminders");
    console.log("schedule end");
  } catch (error) {
    console.error("Cron Error : ", error);
  }
});
