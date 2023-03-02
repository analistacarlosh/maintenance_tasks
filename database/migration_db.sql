-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `maintenance_tasks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `maintenance_tasks`;

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1,	1677326635556,	'migration1677326635556'),
(2,	1677330185437,	'migration1677330185437'),
(3,	1677438525468,	'migration1677438525468'),
(4,	1677438554709,	'migration1677438554709'),
(5,	1677438748294,	'migration1677438748294'),
(6,	1677439315043,	'UserSeed1677439315043');

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `summary` varchar(2500) NOT NULL,
  `title` varchar(200) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f316d3fe53497d4d8a2957db8b9` (`userId`),
  CONSTRAINT `FK_f316d3fe53497d4d8a2957db8b9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('manager','technician') NOT NULL DEFAULT 'technician',
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`created_at`, `updated_at`, `deleted_at`, `id`, `username`, `password`, `role`, `active`) VALUES
('2023-03-02 23:06:31.193065',	'2023-03-02 23:06:31.193065',	NULL,	1,	'manager.test',	'$2b$10$mywVO1hBg1E5QLWsScEuQOlTLF4LQhOv5cxy2jyo5AS2dnIJ9fGw2',	'manager',	1),
('2023-03-02 23:06:31.338834',	'2023-03-02 23:06:31.338834',	NULL,	2,	'technician.test1',	'$2b$10$4ZWxyoX2LR8ckMFgYsvr3.FWjVIN3cR6kvIf/HNk7txhn27HM2T/S',	'technician',	1),
('2023-03-02 23:06:31.484296',	'2023-03-02 23:06:31.484296',	NULL,	3,	'technician.test2',	'$2b$10$Biqyrwu9CeiHfbTtMFIru.PxgU.2DfUGFNDlDgzMjvw0uautiq1pK',	'technician',	1);

-- 2023-03-02 23:07:25
