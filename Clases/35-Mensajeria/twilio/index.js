const twilio = require('twilio')

const ACCOUNT_ID = 'AC6c2afb86484c10cf9f18891fce9339c4'
const AUTH_TOKEN = '54f4b2e3f12b0f165590be4482f18e89'

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