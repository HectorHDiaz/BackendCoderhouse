const moment = require('moment') 
const {getnormalizedMessages} = require('../../models/normalizacion')
const MessagesControllers = require('../../controllers/message.controller')
const UsersControllers = require('../../controllers/user.controller')

const Messages = new MessagesControllers();
const Users = new UsersControllers();

function formatMessage(author, text){
    return {
      author,
      time:`[${moment().format('L')} ${moment().format('LTS')}]`,
      text
    }
}

async function addMessages(socket, sockets){
    sockets.emit('allMessages', getnormalizedMessages(await Messages.getAllMessagesController()));
    const chatBot = {
        email: 'chatbot@chat.com', 
        nombre: 'Chatbot', 
        apellido: '', 
        edad: '', 
        alias: 'Chatbot',
        avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtaUBFUeoZYmRpgnrt1rq0rlxr_y6LDeDULOYbwNVnrjiFqNMckqaxBQLBBMQCM2C_Q4&usqp=CAU',
    }
    const botWelcome = formatMessage(chatBot,'Bienvenido al Chat') 
    socket.emit('newMessage', botWelcome)

    socket.on('updateNewMessage', async (message)=>{
        const user = await Users.getUserByIdController(message.email)
        const newMessage = {
            author:user._id,
            text: message.text,
            time:`[${moment().format('L')} ${moment().format('LTS')}]`
        }
        await Messages.createMessageController(newMessage)
        sockets.emit('allMessages', getnormalizedMessages(await Messages.getAllMessagesController()));
    })
}

module.exports = addMessages