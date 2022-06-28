const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const {
  getPersonas,
  getPersona,
  createPersona,
  updatePersona,
  deletePersona
} = require('./UserController');


const schema = buildSchema(`
  type Persona {
    id: ID!,
    nombre: String,
    edad: Int,
  }

  input PersonaInput {
    nombre: String,
    edad: Int,
  }

  type Query {
    getPersonas: [Persona]
    getPersona(id: ID!): Persona
  }
  
  type Mutation {
    createPersona(datos: PersonaInput): Persona,
    updatePersona(id: ID!, datos: PersonaInput): Persona,
    deletePersona(id: ID!): Persona,
  }
`);

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    getPersonas,
    getPersona,
    createPersona,
    updatePersona,
    deletePersona
  },
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto: ${PORT}`);
})

