-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2024 a las 20:37:48
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
-- Base de datos: `securykey`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidents`
--

USE securykey;

CREATE TABLE `incidents` (
  `incident_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidents`
--

INSERT INTO `incidents` (`incident_id`, `title`, `type`, `description`, `image`, `created_at`, `status`, `userId`) VALUES
(21, 'prueba 1', 'Plumbing', 'descripcion prueba 1', NULL, '2024-10-14 18:34:53', 'solved', 101),
(22, 'prueba 2', 'Painting', 'descripcion prueba 2', NULL, '2024-10-14 18:35:13', 'earring', 101),
(23, 'prueba 3', 'Gardening', 'descripcion prueba 3', NULL, '2024-10-14 18:35:25', 'earring', 101),
(24, 'prueba 4', 'Surveillance cameras', 'descripcion prueba 4', NULL, '2024-10-14 18:35:38', 'earring', 101),
(25, 'prueba 5', 'Public lighting', 'descripcion prueba 5', NULL, '2024-10-14 18:35:52', 'earring', 101),
(26, 'prueba 6', 'Swimming pool', 'descripcion prueba 6', NULL, '2024-10-14 18:36:22', 'solved', 102),
(27, 'prueba 7', 'Exterior lighting', 'descripcion prueba 7', NULL, '2024-10-14 18:36:37', 'earring', 102),
(28, 'prueba 8', 'Others', 'descripcion prueba 8', NULL, '2024-10-14 18:36:50', 'earring', 102);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `f_name` varchar(150) NOT NULL,
  `l_name` varchar(150) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `rol` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `f_name`, `l_name`, `username`, `email`, `password`, `image`, `rol`, `created_at`) VALUES
(100, 'Francisco', 'Vazquez', 'fVAZQUEZ', 'vazquez@example.com', 'contrasena', 'path/to/image.jpg', 'admin', '2024-10-12 01:34:01'),
(101, 'Lorena', 'Nuñez', 'lNUNEZ', 'nuñez@example.com', 'contrasena', 'path/to/image.jpg', 'user', '2024-10-12 01:34:01'),
(102, 'Padme', 'Adara', 'pADARA', 'pADARA@mail.com', '$2b$10$atQ259OqpQCgMVyed5elbOpP6Hhabp4ALiZ8YTHdEDsmxFJLdZevy', NULL, 'user', '2024-10-14 04:16:41');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`incident_id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `incidents`
--
ALTER TABLE `incidents`
  MODIFY `incident_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
