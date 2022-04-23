const {normalize,schema} = require("normalizr")

const getnormalizedMessages = async ()=>{
    const messages = {
      id:'messages',
      messages:[... await allMessages.getAll()]
  }
  const userSchema = new schema.Entity('user', {},{
      idAttribute: 'email'
  })
  const messageSchema = new schema.Entity('message',{
      author: userSchema
  });
  const chatSchema = new schema.Entity('chat',{
      messages:[ messageSchema ]
  });
  return normalize(messages, chatSchema)
}

module.exports = {getnormalizedMessages}