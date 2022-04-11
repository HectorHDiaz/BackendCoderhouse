const mongoose = require('mongoose')
const DATABASE = 'ecommerce'
const DB_URI = `mongodb+srv://HectorDiaz:5CuerdasPRO@cluster.knuiz.mongodb.net/${DATABASE}?retryWrites=true&w=majority`

mongoose.connect(DB_URI).then(()=>{
    console.log('Database connected')
})
