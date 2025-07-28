const express = require('express');
const router = express.Router();
const  CatalogoController = require("../Controllers/catalogo.controller.js")

//EndPoint Para Consultar Todos Los Hoteles
router.get("/hotel", CatalogoController.FindHoteles)

module.exports = router;