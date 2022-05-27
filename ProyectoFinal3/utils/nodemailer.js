const nodemailer = require('nodemailer')
const {adminWppMessage, smsClient} = require('./whatsapp')
const adminConfig = require('./dbConfig')
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const {infoLogger, errorLogger, consoleLogger} = require('./logger/index')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: 'atonomo.4s@gmail.com',
        pass: 'fambykqbelsqvyta'
    }
});

async function newRegister(newUser){
    try {
        const mailPayload = {
            from: 'Proyecto3 - Diaz Hector',
            to: adminConfig.ADMIN_EMAIL,
            subject:`New Register!`,
            html:`
            <html>
                <body>
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${newUser.name}</h5>
                            <p class="card-text">${newUser.email}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${newUser.address}</li>
                            <li class="list-group-item">${newUser.age}</li>
                            <li class="list-group-item">${newUser.phone}</li>
                        </ul>
                    </div>
                </body>
            </html>`,
        };
        const mailInfo = await transporter.sendMail(mailPayload);
        infoLogger.info(mailInfo)
    } catch (error) {
        errorLogger.error(error)
    }
}

async function newPurchase(user,cart){
    try {
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/cartList.hbs"), "utf8")
        const template = handlebars.compile(emailTemplateSource)
        const htmlToSend = template({cart})

        const subjectString = `Nuevo pedido de ${user.name}. Email: ${user.email}`
        const mailPayload = {
            from: 'Proyecto3 - Diaz Hector',
            to: adminConfig.ADMIN_EMAIL,
            subject: subjectString,
            html:htmlToSend,
        };
        const mailInfo = await transporter.sendMail(mailPayload);
        const wppInfo = await adminWppMessage(subjectString)
        const customerSms = await smsClient(user.phone, `Hola ${user.name}! Su pedido ha sido recibido y está ahora en proceso. Gracias!`)
        return true
    } catch (error) {
        errorLogger.error(error)
    }
}


module.exports={newRegister, newPurchase}

