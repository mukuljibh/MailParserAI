import { aiRequestJob } from '../jobs/aiRequestJob.js'
import { emailSendingJob } from '../jobs/emailSendingJob.js';


const processJob = async (job) => {
    const aiResult = await aiRequestJob(job)
    console.log(aiResult)
    //const emailResult = await emailSendingJob(aiResult)
    //console.log(job.data)

}

export { processJob }
