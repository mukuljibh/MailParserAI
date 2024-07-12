import { emailReader } from './src/controller/emailReader.js';
import { GMAIL_CONFIG, OUTLOOK_CONFIG } from './src/config/config.js'

const driver = async () => {

    console.log('Fetching the newly send mail', new Date().toString());
    await emailReader(GMAIL_CONFIG, 'Gmail');
    // await startEmailListener(OUTLOOK_CONFIG, 'Outlook');

};

driver();