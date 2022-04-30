const express = require('express');
const yargs = require('yargs')(process.argv.slice(2))
const cluster = require('cluster')
const os = require('os')

console.log(`Im a process ${process.pid}`)

const args = yargs
.default({PORT:8080})
.alias({p:'PORT'})
.argv;

const PORT = args.PORT;
let visitas = 0;

const delay = (duration) =>{
    const startTime = Date.now();
    while(Date.now() - startTime < duration){

    }
}
     
const app = express()

app.get('/', (req,res)=>{
    res.send(`Numero de visitas en ${process.pid} | ${PORT} => ${++visitas}`)
})

app.get('/timer', (req,res)=>{
    delay(8000);
    res.send(`${process.pid} DIIING!`)
})

app.listen(PORT, ()=>{
    console.log(`Server running in PORT => ${PORT}`  )
});

