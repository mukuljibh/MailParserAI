import { agenda } from "../config/agenda";
import { emailDefineKeys } from "../worker/agenda.worker";
import { BullQueue } from "../config/bull/bull";
import { cleanStr } from "../utils/string.utils";

interface IRecipient {
  sender: string;
  subject: string;
  body: string;
}
export async function enqueueJobs(recipient: IRecipient) {
  const cleanedRecipientData = {
    email: cleanStr(recipient.sender),
    subject: recipient.subject,
    body: recipient.body,
  };

  await agenda.now(emailDefineKeys.PROCESS_EMAIL, {
    recipient: cleanedRecipientData,
  });

  // const result = await BullQueue.add(
  //   "email now being sending to the recipient",
  //   {
  //     email: cleanStr(recipient.sender),
  //     subject: recipient.subject,
  //     body: recipient.body,
  //   }
  // );
  console.log("job has been added to the waiting queue successfully.");
}
