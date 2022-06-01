const { fork } = require('child_process');
const args = require('..')

const getRandom = (res, cant) => {
  if(args.MODO == 'CLUSTER'){
    const {count} = require('./controllers/random.cjs')
    let num;

    if(isNaN(data)) num = undefined;
    else num = data;
    
    const result = count(num);
    res.json(result)
  }else{
    const server = fork('./controllers/random.cjs')
    server.send(cant); // envia la data
    server.on("message", (data) => { // recibe la data
      res.json(data);
    });
  }
}

module.exports = { getRandom };