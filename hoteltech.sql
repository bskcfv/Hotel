-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-01-2025 a las 00:55:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hoteltech`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `id_habitacion` int(11) NOT NULL,
  `no_habitacion` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `fk_id_tipo` int(11) NOT NULL,
  `fk_id_hotel` int(11) NOT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`id_habitacion`, `no_habitacion`, `estado`, `fk_id_tipo`, `fk_id_hotel`, `precio`) VALUES
(1, 'A101', 'Disponible', 1, 1, 2000),
(2, 'B101', 'Disponible', 2, 2, 3000),
(3, 'B102', 'Disponible', 3, 2, 4000),
(4, 'B103', 'Disponible', 1, 2, 2000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id_hotel` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `ciudad` varchar(20) NOT NULL,
  `valoracion` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id_hotel`, `nombre`, `ciudad`, `valoracion`, `imagen`) VALUES
(1, 'Beach Hotel', 'Cartagena', 5, 'https://st3.idealista.com/news/archivos/styles/imagen_big_lightbox/public/2018-05/p1.jpg?sv=u62fQ-4W&itok=Q29-aj5l'),
(2, 'WhiteHouse', 'Medellin', 4, 'https://th.bing.com/th/id/OIF.0eXuaxlRDVHFpGwcUP4RJg?rs=1&pid=ImgDetMain'),
(3, 'Estelar', 'Bogota', 5, 'https://th.bing.com/th/id/R.9600cddb4ea8532db9508b2f292291aa?rik=3YZ%2fjjoSyM6V2g&pid=ImgRaw&r=0'),
(4, 'Sky', 'Cartagena', 3, 'https://tipsparatuviaje.com/wp-content/uploads/2019/05/le-blanc-spa-resort.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `fecha_entrada` date DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `fk_id_habitacion` int(11) DEFAULT NULL,
  `fk_id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `fecha_entrada`, `fecha_salida`, `precio`, `fk_id_habitacion`, `fk_id_user`) VALUES
(1, '2025-01-15', '2025-01-18', 7000, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_habitacion`
--

CREATE TABLE `tipo_habitacion` (
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `no_camas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_habitacion`
--

INSERT INTO `tipo_habitacion` (`id_tipo`, `nombre`, `no_camas`) VALUES
(1, 'Single Room', 1),
(2, 'Double Room', 2),
(3, 'Family Room', 4),
(4, 'Suite', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `edad` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `nombre`, `edad`, `correo`, `contrasena`) VALUES
(1, 'Cristian', 18, 'bsk@gmail.com', 'bsk14'),
(2, 'Isabela', 19, 'bel@hotmail.com', 'bel12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`id_habitacion`),
  ADD KEY `ix_habitacion_id_habitacion` (`id_habitacion`),
  ADD KEY `habitacion_ibfk_1` (`fk_id_tipo`),
  ADD KEY `habitacion_ibfk_2` (`fk_id_hotel`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id_hotel`),
  ADD KEY `ix_hotel_id_hotel` (`id_hotel`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `fk_id_user` (`fk_id_user`),
  ADD KEY `ix_reserva_id_reserva` (`id_reserva`),
  ADD KEY `reserva_ibfk_1` (`fk_id_habitacion`);

--
-- Indices de la tabla `tipo_habitacion`
--
ALTER TABLE `tipo_habitacion`
  ADD PRIMARY KEY (`id_tipo`),
  ADD KEY `ix_tipo_habitacion_id_tipo` (`id_tipo`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `ix_users_id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `id_habitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1213;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id_hotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `tipo_habitacion`
--
ALTER TABLE `tipo_habitacion`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`fk_id_tipo`) REFERENCES `tipo_habitacion` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`fk_id_hotel`) REFERENCES `hotel` (`id_hotel`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`fk_id_habitacion`) REFERENCES `habitacion` (`id_habitacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
