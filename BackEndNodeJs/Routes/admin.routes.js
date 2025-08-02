const express = require('express');
const router = express.Router();
const  AdminController = require("../Controllers/admin.controller.js")

//EndPoint Para Consultar Tipos de Habitaciones
router.get("/typehabt", AdminController.FindTypeHabt)


module.exports = router;