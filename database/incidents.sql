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