const express = require('express');
const {
  listarPersonasController, 
  listarPersonasPorIdController,
  guardarPersonaController, 
  actualizarPersonaController,
  eliminarPersonaController
} = require('../../controllers/personas.controllers');

const router = express.Router();

router.get('/', listarPersonasController);

router.get('/:idPersona', listarPersonasPorIdController);

router.post('/', guardarPersonaController);

router.put('/:idPersona', actualizarPersonaController);

router.delete('/:idPersona', eliminarPersonaController);

module.exports = router;