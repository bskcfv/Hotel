const CatalogoService = require("../Services/catalogo.service.js")

const CatalogoController = {
    FindHoteles : async(req, res) =>{
        try {
            const result = await CatalogoService.FindHoteles();
            res.status(200).send(result);
        } catch (err) {return res.status(400).json({ error: err.sqlMessage });}
    }
}

module.exports = CatalogoController;