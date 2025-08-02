const connection = require("../Config/DB/connect.js").promise();

// Servicio Para Consultar todos los Hoteles
const FindHoteles = async() => {
    const [result] = await connection.query(
        "SELECT * FROM HOTEL;"
    );
    return result;
};

// Servicio Para Consultar el Hotel según Id
const FindHotelById = async(id_hotel) => {
    const [result] = await connection.query(
        "SELECT * FROM HOTEL WHERE ID_HOTEL = ?;",
        [id_hotel]
    );
    return result;
};

// Servicio De Consulta de Habitaciones Según Hotel
const FindHabtByHotel = async (id_hotel) => {
    const [result] = await connection.query(
        `SELECT 
        h.NO_HABITACION, 
        h.ESTADO, th.NOMBRE AS TipoHabitacion, 
        h.precio AS Valor 
        FROM HABITACION AS h 
        JOIN TIPO_HABITACION AS th 
        ON th.id_tipo = h.fk_id_tipo 
        WHERE h.ESTADO = 'Disponible' 
        AND h.fk_id_hotel = ? 
        ORDER BY h.NO_HABITACION;`,
        [id_hotel]
    );
    return result;
};

// Servicio De Consulta de Hotel Por Busqueda
const FindHotelBySearch = async (joker) => {
    const search = joker + '%';
    const [result] = await connection.query(
        `SELECT * 
        FROM HOTEL
        WHERE NOMBRE LIKE ?
        OR CIUDAD LIKE ?;
        `,
        [search, search]
    );
    return result;
};

module.exports = {
    FindHoteles,
    FindHotelById,
    FindHabtByHotel,
    FindHotelBySearch
}