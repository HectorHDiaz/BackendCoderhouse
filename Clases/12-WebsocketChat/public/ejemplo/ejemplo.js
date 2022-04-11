const socket = io('http://localhost:8080'); // conexion del cliente

const messagesContainer = document.getElementById('messages');

socket.on('messages', (data) => {
  console.log(data);
  const html = data.map(message => {
    let frament = `<span><strong>${message.author}:</strong> ${message.text}</span>`;
    return frament;
  }).join('\n');
  console.log(html);
  messagesContainer.innerHTML = html;
});
