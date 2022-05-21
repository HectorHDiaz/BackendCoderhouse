const nodemailer = require('nodemailer')

const MAIL = 'c3xa4zb3tsjq6fza@ethereal.email';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: MAIL,
        pass: 'fe8TXtnhCDj5w38B3a'
    }
});

const mailOptions = {
    from: 'Node JS Server',
    to: MAIL,
    subject:'Order Complete!',
    html:'<h1>Message<h1/>',
};
 
(async ()=>{
    try {
        const mailInfo = await transporter.sendMail(mailOptions);
        console.log(mailInfo)
    } catch (error) {
        console.log(error)
    }
})();