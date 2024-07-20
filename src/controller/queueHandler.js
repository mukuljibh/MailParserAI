import { Worker } from 'bullmq';
import { aiRequestJob } from '../jobs/aiRequestJob.js'
import { emailSendingJob } from '../jobs/emailSendingJob.js';

new Worker('email-queue', async (job) => {
    //pass to worker.js\
    const { email, subject, body } = job.data
    console.log("AI genrating reply messages...")
    const aiResult = await aiRequestJob({ email, subject, body })
    console.log("message is now sending...")
    await emailSendingJob(aiResult, email)
}, {
    connection: {
        host: 'localhost',
        port: '6379'
    }
})