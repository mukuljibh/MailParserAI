
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config({ path: '../../credential.env' });
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const bio = "I am Mukul Bhardwaj, the proud owner of Mukul Beverages, located at 855/Adi Pur, Faridabad. With a passion for delivering delightful culinary experiences, I specialize in offering a wide range of food options including burgers, pizzas, Chinese, and Italian cuisines. Our beverages menu features refreshing drinks such as shakes and mojitos, all available for online ordering. My commitment is to provide quality and satisfaction to our customers, ensuring a delightful dining experience from the comfort of their homes.Contact: +91 - 8368555400 "

const aiRequestJob = async ({ email, subject, body }) => {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `listin please genrate email professionly not addd any template just genrate email as if i genrated myself and if user procide there name then greet with theri else greet with custoer only this is my bio ${bio} please genrate email on my behalf every time customer send you message --> the customer emails detail is ${email} message subject is :${subject} and the message of the customer is this: ${body} so please reply on my behalf by looking into my bio if the customer complain are to critical then ask customer to contact me on personaly through this mobile 9856321658 for assitance please do not add subject line in email and please provide email  div only like entire email in <div></div> use various styles inside div to beautify the content of the email`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}

export { aiRequestJob }