const { PersonasApi } = require('../models/index');

const personas = new PersonasApi();

const listarPersonasController = (req, res) => {
  const { edad, busqueda } = req.query;
  let respuestaPersonas = personas.listarTodos();
  if (Object.keys(req.query).length) {
    if (edad) {
      if (isNaN(+edad)) {
        return res.status(400).send('precioMaximo must be a valid number');
      }
      respuestaPersonas = respuestaPersonas.filter(persona => persona.edad <= +edad);
    }
    if (busqueda) {
      respuestaPersonas = respuestaPersonas
        .filter(persona => 
          persona.nombre.toLowerCase().startsWith(busqueda.toLowerCase()) || 
          persona.apellido.toLowerCase().startsWith(busqueda.toLowerCase())
        )
    }
  }
  return res.json(respuestaPersonas);
};

const listarPersonasPorIdController = (req, res) => {
  const { idPersona } = req.params;
  const persona = personas.listarPorId(idPersona);
  if (persona.error) return res.status(404).send(persona.error);
  return res.json(persona);
};

const guardarPersonaController = (req, res) => {
  const nuevaPersona = personas.guardar(req.body);
  if (nuevaPersona.error) return res.status(400).send(nuevaPersona.error);
  return res.json(nuevaPersona);
};

const actualizarPersonaController = (req, res) => {
  const { params: { idPersona } } = req;
  const personaActualizada = personas.actualizar(req.body, idPersona);
  if (personaActualizada.error) return res.status(404).send(personaActualizada.error);
  return res.json(personaActualizada);
};

const eliminarPersonaController = (req, res) => {
  const { idPersona } = req.params;
  const personaEliminada = personas.eliminar(idPersona);
  if (personaEliminada.error) return res.status(404).send(personaEliminada.error);
  return res.json(personaEliminada);
};

module.exports = {
  listarPersonasController,
  listarPersonasPorIdController,
  guardarPersonaController,
  actualizarPersonaController,
  eliminarPersonaController,
};