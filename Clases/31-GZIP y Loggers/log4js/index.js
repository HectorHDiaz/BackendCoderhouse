const express = require('express')
const compression = require('compression')
const {repeat} = require('../utils/index')
const {logger, consoleLogger,infoLogger,warnLogger,errorLogger, } = require('./logger/index')

const PORT = 8080;
const app = express()

app.get('/saludo', (req,res)=>{
    res.send(repeat('Hola', 1000))
})
app.get('/saludozip', compression(), (req,res)=>{
    res.send(repeat('Hola', 1000))
})

app.listen(PORT, ()=>{
    logger.trace(`ready on port`)
    logger.debug(`Listening on http:localhost:${PORT}`)
    logger.info('usimgapoksdf')
    logger.warn('sadfasdfsadf')
    logger.error('sadfasdfsadf')
    logger.fatal('sadfasdfsadf')
})