Hola profe le dejo mis bases de datos aqui y el diagrama esta en la imagen llamada diagrama.
Creadas las bases de datos en esta ruta puedes crear tu usuario en cualquiera de los roles:

http://localhost:5173/createuser

la contraseña por defaul que crea es 'Funval123'

users:
-- securykey.users definition

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(150) NOT NULL,
  `l_name` varchar(150) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `rol` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

incidents:
-- securykey.incidents definition

CREATE TABLE `incidents` (
  `incident_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`incident_id`),
  KEY `userId` (`userId`),
  CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


agregar incidentes:

INSERT INTO securykey.incidents (incident_id, title, `type`, description, image, created_at, status, userId)
VALUES 
(11, 'PRUEBA 11', 'option 1', 'problema resuelto', NULL, '2024-10-07 18:00:00', 'solved', NULL),
(12, 'PRUEBA 12', 'option 2', 'conexión restaurada', NULL, '2024-10-07 18:30:15', 'solved', NULL),
(13, 'PRUEBA 13', 'option 3', 'base de datos reparada', NULL, '2024-10-07 19:10:40', 'solved', NULL),
(14, 'PRUEBA 14', 'option 1', 'error en el sistema corregido', NULL, '2024-10-07 19:45:22', 'solved', NULL),
(15, 'PRUEBA 15', 'option 2', 'servicio reestablecido', NULL, '2024-10-07 20:20:00', 'solved', NULL);
(1, 'PRUEBA 1', 'option 1', 'algo anda mal', NULL, '2024-10-07 11:40:22', 'earring', NULL),
(2, 'PRUEBA 2', 'option 2', 'error en el sistema', NULL, '2024-10-07 12:00:00', 'earring', NULL),
(3, 'PRUEBA 3', 'option 1', 'problema con el servidor', NULL, '2024-10-07 12:30:15', 'earring', NULL),
(4, 'PRUEBA 4', 'option 3', 'caída de la base de datos', NULL, '2024-10-07 13:10:40', 'earring', NULL),
(5, 'PRUEBA 5', 'option 2', 'inconsistencia en los datos', NULL, '2024-10-07 14:20:22', 'earring', NULL),
(6, 'PRUEBA 6', 'option 1', 'falla de autenticación', NULL, '2024-10-07 15:05:55', 'earring', NULL),
(7, 'PRUEBA 7', 'option 3', 'error desconocido', NULL, '2024-10-07 15:45:30', 'earring', NULL),
(8, 'PRUEBA 8', 'option 2', 'problema de conectividad', NULL, '2024-10-07 16:20:10', 'earring', NULL),
(9, 'PRUEBA 9', 'option 1', 'interrupción del servicio', NULL, '2024-10-07 17:00:00', 'earring', NULL),
(10, 'PRUEBA 10', 'option 3', 'demora en el procesamiento', NULL, '2024-10-07 17:30:45', 'earring', NULL);
