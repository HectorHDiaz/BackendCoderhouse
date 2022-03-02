const socket = io('http://localhost:8080')

socket.on('server-message', (data)=>{
    alert(data)
    socket.emit('confirmation', 'Message from user')
})

//Desafío
const enviar = document.querySelector('#chat-send')
enviar.addEventListener('click', ()=>{
    const texto = document.querySelector('#chat-input')
    socket.emit('message', texto.value)
    texto.value = ""
})

socket.on('messages', (data)=>{
    const htmlArray = data.map(data=>{
        const html = 
        `<div>
            <span>${data.userId}</span>
            <span>${data.message}</span>
        </div>`
        return html
    })
    const messagesHTML = htmlArray.join('\n')
    document.querySelector('#chat-box').innerHTML = messagesHTML
})