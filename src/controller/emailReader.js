import imaps from 'imap-simple'
import moment from 'moment';
import { addJobs } from "../services/bullQueue.js"
import { simpleParser } from 'mailparser'


const snoppingInbox = async (connection) => {

    try {
        await connection.openBox('INBOX', false);
        console.log("inbox has been opened")
        const searchCriteria = ['UNSEEN', ['SINCE', moment().startOf('day').toDate()]];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            struct: true,
        };
        console.log('CHECKING FOR NEW EMAILS', new Date().toString());
        connection.on('mail', () => {
            connection.search(searchCriteria, fetchOptions, async (err, results) => {
                if (results.length > 0) {
                    results.forEach(async (res) => {
                        const mailObj = res.parts.filter((part) => {
                            return part.which = 'TEXT'
                        })
                        const senderAddress = res.parts[1].body.from
                        const mailSubject = res.parts[1].body.subject

                        let uid = res.attributes.uid;
                        connection.addFlags(uid, ['\\Seen'], (err) => {
                            if (err) {
                                console.log("error while marking mail to seen having id : ", uid)
                            }
                            else {
                                console.log("Marked as Seen !")
                                simpleParser(mailObj[0].body)
                                    .then(parsed => {
                                        // console.log({ sender: senderAddress, subject: mailSubject, body: parsed.text })
                                        addJobs({ sender: senderAddress, subject: mailSubject, body: parsed.text });
                                    })
                                    .catch(err => {
                                        console.error('Error parsing email:', err);
                                    });
                            }
                        })
                        //push it in the queue
                    });
                }
            });
        })
    } catch (error) {
        console.log(error)
    }

};
const emailReader = async (config, configType) => {
    try {
        const connection = await imaps.connect(config);
        let account = '';
        configType == 'Gmail' ? account = "Gmail" : account = "Outlook"
        console.log(`CONNECTION SUCCESSFUL to ${account} ACCOUNT`, new Date().toString());
        const checkInterval = 500000; // 5 minutes

        // Initial check
        await snoppingInbox(connection);
        // Set interval to check for new emails every 5 minutes
        setInterval(() => {
            console.log("Snooping again in the inbox....")
        }, checkInterval)

    } catch (error) {
        console.log('ERROR OCCURRED', error);
    }
}




export { emailReader }





