const socket = io.connect()

const   productForm = document.getElementById('productForm'),
        productsTable = document.getElementById('productTable'),
        productsDiv = document.getElementById('productsDiv')
   
productForm.addEventListener('submit',e=>{
    e.preventDefault()
    
        const newProduct={
            name: e.target.name.value,
            price: e.target.price.value,
            image: e.target.image.value,
            desc: e.target.desc.value,
            stock: e.target.stock.value
        }
        socket.emit('new-product', newProduct)
})
socket.on('allProducts', async products=>{
    await makeHtmlTable(products).then(html => {
        productsDiv.innerHTML = html
    })
})
async function makeHtmlTable(products) {
    return fetch('./partials/products.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ products })
            return html
        })
}

socket.on('render-new-product', (newProduct)=>{
    renderProduct(newProduct)
}) 
function renderProduct(item){
    const productTable = document.getElementById('productTable')
    const tr = document.createElement('tr')
      let html=`
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img style="width: 100px;" src=${item.image} alt=${item.name}> </td>`
      tr.innerHTML = html 
      if(productTable){
        productTable.appendChild(tr)
      }else{
        location.reload(true)
      } 
}

const   userForm = document.getElementById('userForm'),
        chatText = document.getElementById('chat-text'),
        sendButton = document.getElementById('send-button'),
        chatBox = document.getElementById('chat-box')

// Websockets - Chat
userForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const newUser = {
        email: e.target.email.value, 
        name: e.target.name.value, 
        lastname: e.target.lastname.value, 
        age: e.target.age.value, 
        alias: e.target.alias.value,
        avatar: e.target.avatar.value,
      }
    socket.emit('newUser', newUser)
})
sendButton.addEventListener('click',()=>{
    const text = chatText.value
    socket.emit('updateNewMessage', text)
    chatText.value = ''
})
socket.on('allMessages', (data,entities)=>{
    const userSchema = new normalizr.schema.Entity('user', {},{
        idAttribute: 'email'
    })
    const messageSchema = new normalizr.schema.Entity('message',{
        author: userSchema
    });
    const chatSchema = new normalizr.schema.Entity('chat',{
        messages:[ messageSchema ]
    });
    const denormalizedData = normalizr.denormalize(data, chatSchema, entities)
    const allMessages = denormalizedData.messages;
    renderMessages(allMessages)
})

function renderMessages(messages){
    chatBox.innerHTML=''
    messages.forEach(msg=>{
        const div = document.createElement('div')
        let html=`
        <span style="color: blue"><b>${msg.author.alias}</b></span>
        <span style="color: orange">[${msg.time}]</span>
        <span style="color: green">${msg.text}</span>`
        div.innerHTML = html
        chatBox.appendChild(div)
    })
}
