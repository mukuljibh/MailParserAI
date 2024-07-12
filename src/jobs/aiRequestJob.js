
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config({ path: '../../credential.env' });
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const aiRequestJob = async (job) => {    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    console.log("message from AI")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `listin AI my name is mukul bhardwaj and i am the owner of the abc company this person(customer) send you this message the message as follows subject is :${job.subject},email address is ${job.email}, and the content is : ${job.body}  please compose a email on my behalf asking them to contact me my number is 123456789 on this number for firther discusuion related tothis`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}

export { aiRequestJob }