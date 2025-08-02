const express = require("express");
const cors = require("cors");
require('dotenv').config();
const CatalogoRoutes = require("./Routes/catalogo.routes.js");
const AdminRoutes = require("./Routes/admin.routes.js")

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//EndPoint de Info de la WebSite
app.use('/catalogo', CatalogoRoutes)

//EndPoint de Info Y Registros By Admin
app.use('/admin', AdminRoutes)

// Escuchar en todas las interfaces
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor Corriendo en http://0.0.0.0:${PORT}`);
});