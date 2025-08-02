const CatalogoService = require("../Services/catalogo.service.js")

const CatalogoController = {
    FindHoteles : async(req, res) =>{
        try {
            //Llamado Al Servicio de Encontrar Hoteles
            const result = await CatalogoService.FindHoteles();
            //Envio de Resultados
            res.status(200).send(result);
        } catch (err) {return res.status(400).json({ error: err.sqlMessage });}
    },
    FindHotelById : async(req, res) => {
        try {
            //Datos A necesitar 
            const {id_hotel} = req.body;
            //Llamado al Servicio De Encontrar Hotel Según el Id
            const result = await CatalogoService.FindHotelById(id_hotel);
            //Envio de Resultado
            res.status(200).send(result);
        } catch (err) {return res.status(400).json({ error: err.sqlMessage });}
    },
    FindHabtByHotel : async(req, res) => {
        try {
            const {id_hotel} = req.body;
            const result = await CatalogoService.FindHabtByHotel(id_hotel);
            //Envio de Resultado
            res.status(200).send(result);
        } catch (err) {return res.status(400).json({ error: err.sqlMessage });}
    },
    FindHotelBySearch : async(req, res) => {
        try {
            const {consulta} = req.body;
            const result = await CatalogoService.FindHotelBySearch(consulta);
            //Envio de Resultado
            res.status(200).send(result);
        } catch (err) {return res.status(400).json({ error: err.sqlMessage });}
    }
}

module.exports = CatalogoController;