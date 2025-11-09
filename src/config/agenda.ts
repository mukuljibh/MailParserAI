import { Agenda } from "agenda";

const agendaInterval = "2 seconds";

const agenda = new Agenda({
  db: { address: process.env.DB_URL, collection: "jobs" },
  processEvery: agendaInterval,
  maxConcurrency: 20,
});

const MAX_RETRIES = 5;

agenda.on("fail", async (err, job) => {
  const retries = job.attrs.failCount || 0;
  if (retries < MAX_RETRIES) {
    const delay = Math.pow(2, retries) * 60000;
    const nextRun = new Date(Date.now() + delay);
    console.log(
      `Job ${job.attrs.name} failed. Retrying in ${delay / 1000} seconds...`
    );
    job.attrs.nextRunAt = nextRun;
    job.attrs.lastRunAt = null;
    await job.save();
  } else {
    job.attrs.nextRunAt = null;
    job.attrs.lockedAt = null;
    job.attrs.data.deadLetter = true;
    job.attrs.data.deadLetterReason = err.message;
    job.attrs.data.deadLetterDate = new Date();
    await job.save();
    console.log(`Job ${job.attrs.name} failed too many times, giving up.`);
  }
});

agenda.on("success", async (job) => {
  try {
    if (job.attrs.name !== "cleanup_resource") {
      await job.remove();
      console.log(`Job '${job.attrs.name}' auto-removed after success`);
    } else {
      console.log(`Job '${job.attrs.name}' left in the queue`);
    }
  } catch (err) {
    console.error("Failed to remove job", err);
  }
});

const startAgenda = async () => {
  await agenda.start();
  console.log("✅ Agenda scheduler started");
};

export { agenda, startAgenda };
