const connection = require("../Config/DB/connect.js").promise();

// Servicio Para Consultar todos los tipos de Hoteles
const FindHoteles = async() => {
    const [result] = await connection.query(
        "SELECT * FROM HOTEL;"
    );
    return result;
};

module.exports = {
    FindHoteles
}