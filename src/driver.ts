import "dotenv/config";
import { startEmailReader } from "./service/email.service";
import { GMAIL_CONFIG } from "./config/imap";
import { startAgenda } from "./config/agenda";

const driver = async () => {
  console.log("Fetching the newly send mail", new Date().toString());
  await startEmailReader(GMAIL_CONFIG, "gmail");
};

startAgenda().then(() => driver());
