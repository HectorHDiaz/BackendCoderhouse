const { fork } = require('child_process');

const getRandom = (res, cant) => {
  const server = fork('./controllers/random.cjs');
  server.send(cant); // envia la data
  server.on("message", (data) => { // recibe la data
    res.json(data);
  });
}

module.exports = { getRandom };