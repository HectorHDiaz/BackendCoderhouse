const express = require('express');

    const PORT = process.argv[2];
    let visitas = 0;

    const delay = (duration) =>{
        const startTime = Date.now();
        while(Date.now() - startTime < duration){

        }
    }
        
    const app = express()

    app.get('/', (req,res)=>{
        res.send(`Numero de visitas en ${process.pid} => ${++visitas}`)
    })

    app.get('/timer', (req,res)=>{
        delay(8000);
        res.send(`${process.pid} DIIING!`)
    })

    app.listen(PORT, ()=>{
        console.log(`Server running in PORT => ${PORT}`  )
    });

