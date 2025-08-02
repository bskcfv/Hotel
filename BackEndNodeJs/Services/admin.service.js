const connection = require("../Config/DB/connect.js").promise();

// Servicio De Consulta de Tipos de Habitaciones
const FindTypeHabt = async () => {
    const [result] = await connection.query(
        "SELECT * FROM TIPO_HABITACION;"
    );
    return result;
};

module.exports = {
    FindTypeHabt
}