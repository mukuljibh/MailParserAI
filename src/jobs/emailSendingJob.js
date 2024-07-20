import nodemailer from "nodemailer";

const emailSendingJob = async (aiResult, email) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mukulbhardwaj966@gmail.com",
            pass: "famy rafw ytap ebgg",
        },
    });
    var mailOptions = {
        from: '"Mukul bhardwaj" < mukulbhardwaj966@gmail.com>',
        to: `${email}`,
        subject: "Re: Regarding customer Privious message",
        text: "hello world",
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
            ${aiResult}
        </div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("erro from nodemailer");

        } else {
            console.log("sent succesfully");
        }
    });
}

export { emailSendingJob }