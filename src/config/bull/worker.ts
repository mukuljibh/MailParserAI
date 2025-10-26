import { Worker } from "bullmq";
import { generateCustomerEmail } from "../../helper/email.helper.js";
import { sendEmail } from "../../helper/email.helper.js";

new Worker(
  "email-queue",
  async (job) => {
    //pass to worker.js\
    const { email, subject, body } = job.data;
    console.log("AI genrating reply messages...");
    const aiResult = await generateCustomerEmail({ email, subject, body });
    console.log("message is now sending...");
    await sendEmail({ body: aiResult, recipient: email });
  },
  {
    connection: {
      url: process.env.UPSTASH_REDIS_URL,
      tls: {},
    },
  }
);
