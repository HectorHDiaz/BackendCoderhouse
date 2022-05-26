const nodemailer = require('nodemailer')
const adminConfig = require('./dbConfig')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: 'atonomo.4s@gmail.com',
        pass: 'fambykqbelsqvyta'
    }
});

// const mailOptions = {
//     from: 'Node JS Server',
//     to: 'atonomo.4s@gmail.com',
//     subject:'Order Complete!',
//     html:'<h1>Message<h1/>',
// };
// (async ()=>{
//     try {
//         const mailInfo = await transporter.sendMail(mailOptions);
//         console.log(mailInfo)
//     } catch (error) {
//         console.log(error)
//     }
// });
async function newRegister(newUser){
    try {
        const mailPayload = {
            from: 'Proyecto3 - Diaz Hector',
            to: adminConfig.ADMIN_EMAIL,
            subject:`New Register!`,
            html:`
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                </head>
                <body>
                    <div class="card" style="width: 18rem;">
                        <img src="..." class="card-img-top" alt="...">
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
        console.log(mailInfo)
    } catch (error) {
        console.log(error)
    }
}

function newPurchase(){

}

module.exports={newRegister}

