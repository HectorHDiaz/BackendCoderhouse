const socket = io.connect()

const   productForm = document.getElementById('productForm'),
        productsTable = document.getElementById('productTable')


        
productForm.addEventListener('submit',e=>{
    e.preventDefault()
        const newProduct={
            title: e.target[0].value,
            price: e.target[1].value,
            thumbnail:e.target[2].value
        }
        socket.emit('new-product', newProduct)
})
socket.on('allProducts', (products)=>{
    console.log(products)
    if(products){
        makeHtmlTable(products).then(html => {
            productsTable.innerHTML = html
        })
    }
})
function makeHtmlTable(productos) {
    return fetch('./partials/products.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}
socket.on('render-new-product', (newProduct)=>{
    renderProduct(newProduct)
}) 
function renderProduct(item){
    const tr = document.createElement('tr')
      let html=`
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td><img style="width: 100px;" src=${item.thumbnail} alt=${item.title}> </td>`
      tr.innerHTML = html
      if(productsTable){
          productsTable.appendChild(tr)
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