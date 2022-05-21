const nodemailer = require('nodemailer')

const MAIL = 'c3xa4zb3tsjq6fza@ethereal.email';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: 'atonomo.4s@gmail.com',
        pass: 'fambykqbelsqvyta'
    }
});

const mailOptions = {
    from: 'Node JS Server',
    to: 'atonomo.4s@gmail.com',
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