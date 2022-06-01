const express = require('express');
const { getRandom }= require ('../../../controllers/randomController');

const randomRoutes = express.Router();

randomRoutes.get('/', (req, res) => {
  const { cant } = req.query;
  if(cant == undefined) return getRandom(res, "start"); // envia un string
  if(isNaN(cant)) return res.json({ error: "the quantity entered must be a number" });
  getRandom(res, cant); // envia la data
});
randomRoutes.get('/:cant', (req, res) => {
  const { cant } = req.params;
  if(cant == undefined) return getRandom(res, "start"); // envia un string
  if(isNaN(cant)) return res.json({ error: "the quantity entered must be a number" });
  getRandom(res, cant); // envia la data
});

module.exports = randomRoutes;