const socket = io.connect()

const   productForm = document.getElementById('productForm'),
        productsTable = document.getElementById('productTable'),
        productsDiv = document.getElementById('productsDiv')


        
productForm.addEventListener('submit',e=>{
    e.preventDefault()
        const newProduct={
            name: e.target[0].value,
            price: e.target[1].value,
            image: e.target[2].value
        }
        socket.emit('new-product', newProduct)
})
socket.on('allProducts', async products=>{
    await makeHtmlTable(products).then(html => {
        console.log(products)
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

const   emailText = document.getElementById('emailInput'),
        emailButton = document.getElementById('email-button'),
        chatText = document.getElementById('chat-text'),
        sendButton = document.getElementById('send-button'),
        chatBox = document.getElementById('chat-box')

// Websockets - Chat
emailButton.addEventListener('click', ()=>{
    const newUser=emailText.value
    socket.emit('newEmail', newUser)
    emailText.disabled = true
})
sendButton.addEventListener('click',()=>{
    const text = chatText.value
    socket.emit('updateNewMessage', text)
    chatText.value = ''
})
socket.on('allMessages', data=>{
    data.forEach(msg => {
        renderMessage(msg)
    });
})
socket.on('newMessage', (newMessage)=>{
    renderMessage(newMessage)
})

function renderMessage(message){
    const div = document.createElement('div')
      let html=`
        <span style="color: blue"><b>${message.email}</b></span>
        <span style="color: orange">[${message.time}]</span>
        <span style="color: green">${message.text}</span>`
      div.innerHTML = html
      chatBox.appendChild(div)
}