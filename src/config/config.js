import dotenv from 'dotenv'

dotenv.config({ path: "credential.env" });
const GMAIL_CONFIG = {
    imap: {
        user: process.env.gmailUsername,
        password: process.env.gmailPassword,
        host: 'imap.gmail.com',
        port: 993,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },

    },
};
const OUTLOOK_CONFIG = {
    imap: {
        user: process.env.outlookUsername,
        password: process.env.outlookPassword,
        host: 'outlook.office365.com',
        port: 993,
        authTimeout: 10000,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
    },
};
export { GMAIL_CONFIG, OUTLOOK_CONFIG }