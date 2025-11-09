import { generateCustomerEmail, sendEmail } from "../helper/email.helper";
import { agenda } from "../config/agenda";

export const emailDefineKeys = {
  PROCESS_EMAIL: "process_email",
};

agenda.define(
  emailDefineKeys.PROCESS_EMAIL,
  {
    concurrency: 1,
    lockLimit: 1,
    lockLifetime: 60000,
  },
  async (job) => {
    const { recipient } = job.attrs.data;
    const { email, subject, body } = recipient;
    console.log("AI genrating reply messages...");
    const aiResult = await generateCustomerEmail({ email, subject, body });
    console.log("message is now sending...");
    await sendEmail({ body: aiResult, recipient: email });
  }
);
