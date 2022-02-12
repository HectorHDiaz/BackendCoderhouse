const express = require("express")
const apiRoutes = require('./router/indexRoutes')

const app = express();
const PORT = process.env.PORT || 8080

//Middlewares
app.use(express.json())
app.use(express.static('public'))

app.use('/api', apiRoutes)

const connected = app.listen(PORT, ()=>{
    console.log("API Restful running...")
})

connected.on('error', (error)=>{
    console.error('Error: ', error)
})