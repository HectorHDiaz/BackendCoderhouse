const mongoose = require('mongoose')

const Schema = mongoose.Schema
const coleccion = 'users'

const UsersSchema = new Schema({
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    pais: { type: String, required: true},
    edad: { type: Number, },
})

const Usuario = mongoose.model(coleccion, UsersSchema)

module.exports = Usuario