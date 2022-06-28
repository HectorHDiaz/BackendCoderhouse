const { v4: uuid } = require('uuid');
const Persona = require('./PersonaDAO');
const personasDB = {};

const getPersonas = () => {
  const personas = Object.values(personasDB);
  return personas;
};

const getPersona = ({ id }) => {
  if (!personasDB[id]) {
    throw new Error(`Persona not found`);
  }
  return personasDB[id];
};

const createPersona = ({ datos }) => {
  const id = uuid();
  const newPersona = new Persona(id, datos);
  personasDB[id] = newPersona;
  return newPersona;
};

const updatePersona = ({ id, datos }) => {
  if (!personasDB[id]) {
    throw new Error(`Persona not found`);
  }
  const updatedPersona = new Persona(id, datos);
  personasDB[id] = updatePersona;
  return updatedPersona;
};

const deletePersona = ({ id }) => {
  if (!personasDB[id]) {
    throw new Error(`Persona not found`);
  }
  const deletedPersona = personasDB[id];
  delete personasDB[ id ];
  return deletedPersona;
};

module.exports = {
  getPersonas,
  getPersona,
  createPersona,
  updatePersona,
  deletePersona
};