import { Queue } from 'bullmq';

const emailSendQueue = new Queue('email-queue', {
    connection: {
        host: 'localhost',
        port: '6379'
    }
})
function cleanStr(str) {
    let validEmailRegx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    let emailMatch = str.match(validEmailRegx);
    return emailMatch[0];
}

async function addJobs(email) {

    const result = await emailSendQueue.add("email now being sending to the recipient", {
        email: cleanStr(...email.sender),
        subject: email.subject,
        body: email.body
    });
    console.log("job has been done successful added to the waiting Queue..", result.id)

}

export { addJobs }


