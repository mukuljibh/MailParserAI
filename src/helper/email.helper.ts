import nodemailer from "nodemailer";
import { genAI } from "../config/gemini";

export async function generateCustomerEmail({ email, subject, body }) {
  const context = `I am Rajesh Kumar, the proud owner of Rajesh's Treats, 
located at Sector 45, Chandigarh. With a passion for 
delivering delightful culinary experiences, I specialize in offering 
a wide range of food options including North Indian, South Indian, 
and Chinese cuisines. Our beverages menu features refreshing drinks 
such as lassis and fresh juices, all available for online ordering.
My commitment is to provide quality and satisfaction to our customers,
ensuring a delightful dining experience from the comfort of their homes.
Contact: +91 - 9856321658`;

  const prompt = `Generate a professional email using this bio: ${context}.
Customer email: ${email}, subject: ${subject}, body: ${body}.
Reply as if written by me. If complaint is critical, ask customer to call 9856321658.
Return email inside <div> with inline styles, no subject line.`;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating email:", error);
    return null;
  }
}

interface ISendEmailOptions {
  recipient: string;
  body: string;
}
export async function sendEmail(option: ISendEmailOptions) {
  const { recipient, body } = option;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmailUsername,
      pass: process.env.gmailPassword,
    },
  });
  var mailOptions = {
    from: '"Mukul bhardwaj" <mukulbhardwat@gmail.com>',
    to: `${recipient}`,
    subject: "Re: Regarding customer Previous message",
    html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
            ${body}
        </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error from nodemailer");
    } else {
      console.log("sent succesfully");
    }
  });
}
