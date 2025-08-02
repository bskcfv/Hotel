const express = require('express');
const router = express.Router();
const  CatalogoController = require("../Controllers/catalogo.controller.js")

//EndPoint Para Consultar Todos Los Hoteles
router.get("/hotel", CatalogoController.FindHoteles)

//EndPoint Para Consultar Hotel Según Id
router.post("/hotel/id", CatalogoController.FindHotelById)

//EndPoint Para Consultar Habitaciones Segun el Hotel
router.post("/hotel/habt", CatalogoController.FindHabtByHotel)

//EndPoint Para Consultar Hoteles Segun Parametros de Busqueda
router.post("/hotel/search", CatalogoController.FindHotelBySearch)

module.exports = router;