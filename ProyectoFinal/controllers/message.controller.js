const MessageService = require('../services/messages.services')

class MessageController{
  constructor(){
    this.messageService = new MessageService()
  }

  getAllMessages = async () =>{
    const allMessages = await this.messageService.getAllMessagesService()
    return allMessages;
  }
  getMessageById = async (req,res) =>{
    const messageId = req.params.messageId;
    const searchedMessage = await this.messageService.getMessageByIdService(messageId);
    return searchedMessage;
  }
  createMessage = async(messagePayload) =>{
    const newMessage = await this.messageService.createMessageService(messagePayload);
    return newMessage;
  }
}
module.exports=MessageController