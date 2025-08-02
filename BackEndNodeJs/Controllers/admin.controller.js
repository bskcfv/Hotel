const AdminService = require("../Services/admin.service.js")

const AdminController = {
    FindTypeHabt : async(req, res) => {
        try {
            const result = await AdminService.FindTypeHabt();
            res.status(200).send(result);
        } catch (err) {return res.status(400).json({ error: err.sqlMessage });}
    }
}

module.exports = AdminController;