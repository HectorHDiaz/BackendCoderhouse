const twilio = require('twilio')

const ACCOUNT_ID = ''
const AUTH_TOKEN = ''

const twilioClient = twilio(ACCOUNT_ID, AUTH_TOKEN);

(async ()=>{
    try {
        const messagePayload = {
            from:'+12406475895',
            to:'+541122526521',
            body:'Hola gordo',
        }
        const messageResponse = await twilioClient.messages.create(messagePayload)
        console.log(messageResponse)
        
    } catch (error) {
        console.log(error)
    }
})();