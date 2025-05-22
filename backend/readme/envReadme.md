The following environment variables need to be created.

PORT
MONGODB_URL
SECRET_KEY
SECRET_KEY_HASH

#SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<your-email>@gmail.com
SMTP_PASSWORD=
SMTP_FROM=<your-email>@gmail.com

#CRON Configuration
CRON_JOB_SCHEDULE_SELECT=true

/\_
npm install moment //3rd party library
moment.utc("2025-05-22T00:05:00z");
const indiaTime = utcTime.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

const localTime = new Date();
const utcTime = new Date(localTime.toUTCString())
log -> localTime.toString();
log -> utcTime.toString();

TODO: Create a model SchedulerSchema
fields -> timestamp(UTC), task-send , success, failure, taskId
\_/
