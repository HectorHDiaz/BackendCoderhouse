const twilio = require('twilio')

const ACCOUNT_SID='AC6c2afb86484c10cf9f18891fce9339c4';
const ACCOUNT_TOKEN = '2504be7332726c90f9d01fe5f66a225a';

const twilioClient = twilio(ACCOUNT_SID, ACCOUNT_TOKEN)

const options = {
    fromt:'whatsapp: +12406475895',
    to:'whatsapp: +541122526521',
    body:'Hola! Soy un server de Node.JS',
};

(async () => {
    try {
        const options = {
            from:'whatsapp:+14155238886',
            to:'whatsapp:+541122526521',
            body:'Hola! Soy un server de Node.JS',
        };
        const messageResponse = await twilioClient.messages.create(options)
        console.log(messageResponse)
        
    } 
    catch (error) {
        console.log(error.message)
    }
})();