-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 20, 2020 at 01:29 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_call`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `ID` varchar(60) NOT NULL,
  `Date` date NOT NULL,
  `Priority` int(11) NOT NULL DEFAULT 1,
  `Full name` text NOT NULL,
  `Case number` int(1) NOT NULL,
  `Problem` text NOT NULL,
  `Phone number` varchar(12) NOT NULL,
  `Status` varchar(20) NOT NULL DEFAULT 'Free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`ID`, `Date`, `Priority`, `Full name`, `Case number`, `Problem`, `Phone number`, `Status`) VALUES
('498893484929', '2020-04-14', 1, 'Хаммидулина Светлана Минизагитовна', 1, 'Сломался принтер', '+79871488594', 'Free');

-- --------------------------------------------------------

--
-- Table structure for table `applications_of_executers`
--

CREATE TABLE `applications_of_executers` (
  `ID` varchar(60) NOT NULL,
  `ID_EXECUTER` varchar(60) NOT NULL,
  `ID_APPLICATION` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `executers`
--

CREATE TABLE `executers` (
  `ID` varchar(60) NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Password` char(100) NOT NULL,
  `Full_name` text NOT NULL,
  `ID_ROLE` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `executers`
--

INSERT INTO `executers` (`ID`, `Login`, `Password`, `Full_name`, `ID_ROLE`) VALUES
('82a7f5f0-94a6-4845-be2f-246d4d1ac9bb', 'lordprotein', 'f519bcff8be73f7baa7123d387778ba0', 'Романов Илья Андреевич', 'd7717aeb-6917-4e96-bb4c-ec3f347498be');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `ID` varchar(60) NOT NULL,
  `Delete_application` tinyint(1) NOT NULL,
  `Set_executer` tinyint(1) NOT NULL,
  `Set_priority` tinyint(1) NOT NULL,
  `To_accept_application` tinyint(1) NOT NULL,
  `Reset_application` tinyint(1) NOT NULL,
  `Defer_application` tinyint(1) NOT NULL,
  `Show_all_applications` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`ID`, `Delete_application`, `Set_executer`, `Set_priority`, `To_accept_application`, `Reset_application`, `Defer_application`, `Show_all_applications`) VALUES
('1f7fcc56-8a16-461a-8f73-4a96bf7802a0', 0, 0, 0, 1, 0, 1, 0),
('ffb8218e-c3ba-4f93-b28c-92abdccc1b3e', 1, 1, 1, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ID` varchar(60) NOT NULL,
  `ID_PERMISSION` varchar(60) NOT NULL,
  `Role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID`, `ID_PERMISSION`, `Role`) VALUES
('4bc9554b-868e-4c01-a169-3696185a88d8\r\n', '1f7fcc56-8a16-461a-8f73-4a96bf7802a0', 'Executer'),
('d7717aeb-6917-4e96-bb4c-ec3f347498be', 'ffb8218e-c3ba-4f93-b28c-92abdccc1b3e', 'Administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `applications_of_executers`
--
ALTER TABLE `applications_of_executers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Application` (`ID_APPLICATION`),
  ADD KEY `Executer` (`ID_EXECUTER`);

--
-- Indexes for table `executers`
--
ALTER TABLE `executers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_ROLE` (`ID_ROLE`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_PREMISSION` (`ID_PERMISSION`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications_of_executers`
--
ALTER TABLE `applications_of_executers`
  ADD CONSTRAINT `Application` FOREIGN KEY (`ID_APPLICATION`) REFERENCES `applications` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Executer` FOREIGN KEY (`ID_EXECUTER`) REFERENCES `executers` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `executers`
--
ALTER TABLE `executers`
  ADD CONSTRAINT `ID_ROLE` FOREIGN KEY (`ID_ROLE`) REFERENCES `roles` (`ID`);

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `ID_PREMISSION` FOREIGN KEY (`ID_PERMISSION`) REFERENCES `permissions` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
