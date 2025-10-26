import { BullQueue } from "../config/bull/bull";
import { cleanStr } from "../utils/string.utils";

interface IRecipient {
  sender: string;
  subject: string;
  body: string;
}
export async function enqueueJobs(recipient: IRecipient) {
  const result = await BullQueue.add(
    "email now being sending to the recipient",
    {
      email: cleanStr(recipient.sender),
      subject: recipient.subject,
      body: recipient.body,
    }
  );
  console.log(
    "job has been done successful added to the waiting Queue..",
    result.id
  );
}
