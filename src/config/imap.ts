const gmailOptions = {
  user: process.env.gmailUsername,
  password: process.env.gmailPassword,
  host: "imap.gmail.com",
  port: 993,
  authTimeout: 10000,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

const GMAIL_CONFIG = gmailOptions;

const OUTLOOK_CONFIG = {
  user: process.env.outlookUsername,
  password: process.env.outlookPassword,
  host: "outlook.office365.com",
  port: 993,
  authTimeout: 10000,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};
export { GMAIL_CONFIG, OUTLOOK_CONFIG };
