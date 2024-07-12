import { Worker } from 'bullmq';
import { processJob } from './worker.js';

const workerThread = new Worker('email-queue', async (job) => {

    //pass to worker.js
    await processJob(job.data)
}, {
    connection: {
        host: 'localhost',
        port: '6379'
    }
})