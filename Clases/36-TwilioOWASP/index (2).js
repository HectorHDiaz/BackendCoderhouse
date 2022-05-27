const twilio = require('twilio');

const ACCOUNT_SID = 'ACdf8ecea556256209c5d3bd5863e95efb';
const ACCOUNT_TOKEN = 'c8dfd1e4c1a058f0b1e8f3438555586a';

const twilioClient = twilio(ACCOUNT_SID, ACCOUNT_TOKEN);

(async () => {
  try {
    const messagePayload = {
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+573008448809',
      mediaUrl: [
        'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg', 
        'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'
      ],
      body: 'Hola que tal? Soy un server de Node Js y te envio esta imagen'
    };
    const messageResponse = await twilioClient.messages.create(messagePayload);
    console.log(messageResponse);
  }
  catch(error){
    console.log(error.message);
  }
})();