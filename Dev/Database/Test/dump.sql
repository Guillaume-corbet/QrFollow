-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: qrmania_test
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Organisations`
--

DROP TABLE IF EXISTS `Organisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organisations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organisations`
--

LOCK TABLES `Organisations` WRITE;
/*!40000 ALTER TABLE `Organisations` DISABLE KEYS */;
INSERT INTO `Organisations` VALUES (1,'728c68e5-ba77-41c6-bcdc-b1f2f306bdce','test_organisation',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(2,'9a7db470-e17c-41a9-a07b-fa76f91e9a91','org_for_test',1,'2022-04-28 12:00:00','2022-04-28 12:00:00');
/*!40000 ALTER TABLE `Organisations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (5,'0b297e9f-de06-4419-b763-7ade0df98aab','default_admin_in_disable@gmail.com','$2b$10$yr5hfF.lV92CkW7PElohZOTCLUbwLiBVuH397pMaiifAblm7k1zh6','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(1,'25c619ce-2ca4-4545-9217-17caf9536f5e','default_admin_in_org@gmail.com','$2b$10$yr5hfF.lV92CkW7PElohZOTCLUbwLiBVuH397pMaiifAblm7k1zh6','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(2,'8c9503c5-cdf9-44a3-befa-8174ee5dc267','default_default_in_org@gmail.com','$2b$10$yr5hfF.lV92CkW7PElohZOTCLUbwLiBVuH397pMaiifAblm7k1zh6','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(3,'b033c7ce-5441-4a90-b839-e5437fb9a58d','default_no_org@gmail.com','$2b$10$yr5hfF.lV92CkW7PElohZOTCLUbwLiBVuH397pMaiifAblm7k1zh6','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(6,'cc5e53b8-7a92-48aa-8fa6-13f714119de9','default_default_in_disable@gmail.com','$2b$10$yr5hfF.lV92CkW7PElohZOTCLUbwLiBVuH397pMaiifAblm7k1zh6','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(4,'f8fcbd6d-0c0e-4ea3-89c5-41daf926fc77','admin@gmail.com','$2b$10$yr5hfF.lV92CkW7PElohZOTCLUbwLiBVuH397pMaiifAblm7k1zh6','admin',1,'2022-04-28 12:00:00','2022-04-28 12:00:00');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsersOrganisations`
--

DROP TABLE IF EXISTS `UsersOrganisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UsersOrganisations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userUuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `organisationUuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userUuid` (`userUuid`),
  KEY `organisationUuid` (`organisationUuid`),
  CONSTRAINT `UsersOrganisations_ibfk_1` FOREIGN KEY (`userUuid`) REFERENCES `Users` (`uuid`) ON UPDATE CASCADE,
  CONSTRAINT `UsersOrganisations_ibfk_2` FOREIGN KEY (`organisationUuid`) REFERENCES `Organisations` (`uuid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsersOrganisations`
--

LOCK TABLES `UsersOrganisations` WRITE;
/*!40000 ALTER TABLE `UsersOrganisations` DISABLE KEYS */;
INSERT INTO `UsersOrganisations` VALUES (1,'25c619ce-2ca4-4545-9217-17caf9536f5e','728c68e5-ba77-41c6-bcdc-b1f2f306bdce','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(2,'8c9503c5-cdf9-44a3-befa-8174ee5dc267','728c68e5-ba77-41c6-bcdc-b1f2f306bdce','admin',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(3,'0b297e9f-de06-4419-b763-7ade0df98aab','9a7db470-e17c-41a9-a07b-fa76f91e9a91','admin',1,'2022-04-28 12:00:00','2022-04-28 12:00:00'),(4,'cc5e53b8-7a92-48aa-8fa6-13f714119de9','9a7db470-e17c-41a9-a07b-fa76f91e9a91','default',1,'2022-04-28 12:00:00','2022-04-28 12:00:00');
/*!40000 ALTER TABLE `UsersOrganisations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'qrmania_test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-07  0:02:41
