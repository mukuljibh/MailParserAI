import "dotenv/config";
import { startEmailReader } from "./service/email.service.js";
import { GMAIL_CONFIG, OUTLOOK_CONFIG } from "./config/imap.js";

const driver = async () => {
  console.log("Fetching the newly send mail", new Date().toString());
  await startEmailReader(GMAIL_CONFIG, "gmail");
  //await emailReader(OUTLOOK_CONFIG, 'Outlook');
};

driver();
