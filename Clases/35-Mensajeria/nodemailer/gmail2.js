const nodemailer = require('nodemailer');
const fs = require('fs');

const MAIL = 'bart.maggio83@ethereal.email';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'jorge.maloing@gmail.com',
    pass: '1234'
  }
});

const mailOptions = {
  from: 'Node JS Server',
  to: 'este_correo_no_existe123454654568568@gmail.com',
  subject: 'Your order is complete!',
  html: fs.readFileSync(process.cwd() + '/mail.html'),
  attachments: [
    {
      path: 'bat_metal.gif'
    }
  ]
};

(async () => {
  try {
    const mailInfo = await transporter.sendMail(mailOptions);
    console.log(mailInfo);
  }
  catch(error){

  }
})();