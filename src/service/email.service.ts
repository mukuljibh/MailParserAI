import imaps from "imap-simple";
import moment from "moment";
import { enqueueJobs } from "./queue.service";
import { simpleParser } from "mailparser";

const processEmail = async (connection: any, emailData: any) => {
  const mailObj = emailData.parts.filter((part: any) => part.which === "TEXT");
  const senderAddress = emailData.parts[1].body.from;
  const mailSubject = emailData.parts[1].body.subject;
  const uid = emailData.attributes.uid;

  try {
    await connection.addFlags(uid, ["\\Seen"]);
    console.log(`Marked email UID ${uid} as Seen`);

    const parsed = await simpleParser(mailObj[0].body);
    enqueueJobs({
      sender: senderAddress[0],
      subject: mailSubject,
      body: parsed.text,
    });
  } catch (err) {
    console.error(`Error processing email UID ${uid}:`, err);
  }
};

const processInbox = async (connection: any) => {
  try {
    await connection.openBox("INBOX", false);
    console.log("Inbox opened");

    const searchCriteria = [
      "UNSEEN",
      ["SINCE", moment().startOf("day").toDate()],
    ];
    const fetchOptions = { bodies: ["HEADER", "TEXT"], struct: true };

    const checkEmails = async () => {
      const results = await connection.search(searchCriteria, fetchOptions);
      if (results.length > 0) {
        for (const res of results) {
          await processEmail(connection, res);
        }
      } else {
        console.log("No new emails at", new Date().toISOString());
      }
    };

    connection.on("mail", checkEmails);
    await checkEmails();
  } catch (error) {
    console.error("Error processing inbox:", error);
  }
};

export async function startEmailReader(
  config: any,
  configType: "gmail" | "outlook"
) {
  try {
    const connection = await imaps.connect({ imap: config });
    console.log(
      `Connection successful to ${configType.toUpperCase()} account`,
      new Date().toISOString()
    );

    const checkInterval = 500_000;
    await processInbox(connection);

    setInterval(async () => {
      console.log("Checking inbox again...", new Date().toISOString());
      await processInbox(connection);
    }, checkInterval);
  } catch (error) {
    console.error("Error occurred in email reader:", error);
  }
}
