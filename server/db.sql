-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 06, 2020 at 04:19 PM
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
  `date` date NOT NULL,
  `priority` int(11) NOT NULL DEFAULT 1,
  `full_name` text NOT NULL,
  `case_num` int(1) NOT NULL,
  `task` text NOT NULL,
  `phone_num` varchar(12) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`ID`, `date`, `priority`, `full_name`, `case_num`, `task`, `phone_num`, `status`) VALUES
('0f1ceb92-9cf1-47b4-8375-4861780a08ea', '2020-04-10', 3, 'Рафикова Шамзида Рюриковна', 2, 'Сломалось фамильное древо с логикой моего отчества', '+79170003322', 'Process'),
('a07fe628-ea11-4190-a6d7-d98b74273541', '2020-04-12', 5, 'Иванов Иван Иванович', 2, 'Почистить компьютер от вирусов', '+79191322456', 'Free'),
('ac6975b1-ea16-4fe2-bf3d-d2e7a480721b', '2020-04-14', 1, 'Хаммидулина Светлана Минизагитовна', 1, 'Сломался принтер', '+79871488594', 'Free'),
('d83b5303-98a8-443c-9f07-6e62cb46f728', '2020-04-11', 1, 'Малюткина Анна Евгеньевна', 1, 'Принести новые диски с фильмами', '+79871877666', 'Free');

-- --------------------------------------------------------

--
-- Table structure for table `applications_of_executers`
--

CREATE TABLE `applications_of_executers` (
  `ID` varchar(60) NOT NULL,
  `ID_EXECUTER` varchar(60) NOT NULL,
  `ID_APPLICATION` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications_of_executers`
--

INSERT INTO `applications_of_executers` (`ID`, `ID_EXECUTER`, `ID_APPLICATION`) VALUES
('f4f5d46e-4abc-45db-958f-c04fed314d16', '386155e0-ffa7-4baf-adf8-2b88d8455e8e', '0f1ceb92-9cf1-47b4-8375-4861780a08ea');

-- --------------------------------------------------------

--
-- Table structure for table `executers`
--

CREATE TABLE `executers` (
  `ID` varchar(60) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` char(100) NOT NULL,
  `full_name` text NOT NULL,
  `ID_ROLE` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `executers`
--

INSERT INTO `executers` (`ID`, `login`, `password`, `full_name`, `ID_ROLE`) VALUES
('386155e0-ffa7-4baf-adf8-2b88d8455e8e', 'petrShoot', 'efa66a578e1c1af6d6b77a419a95255c', 'Анатольев Петр Семенович', '4bc9554b-868e-4c01-a169-3696185a88d8'),
('82a7f5f0-94a6-4845-be2f-246d4d1ac9bb', 'lordprotein', 'f519bcff8be73f7baa7123d387778ba0', 'Романов Илья Андреевич', 'd7717aeb-6917-4e96-bb4c-ec3f347498be'),
('9ad94158-c2e3-4aa5-929c-6cdef375587d', 'christmas3', 'b2118f4ef0b03a7f5428eef5f40402a1', 'Марков Александр Грубищев', '4bc9554b-868e-4c01-a169-3696185a88d8'),
('dff5142b-3f8a-4b53-b188-ed17ce3399de', 'maroolila56', '6c30734811916b0f0f24a4630b08036f', 'Ланина Мария Сергеевна', '4bc9554b-868e-4c01-a169-3696185a88d8');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `ID` varchar(60) NOT NULL,
  `delete_application` tinyint(1) NOT NULL,
  `set_executer` tinyint(1) NOT NULL,
  `set_priority` tinyint(1) NOT NULL,
  `accept_application` tinyint(1) NOT NULL,
  `reset_application` tinyint(1) NOT NULL,
  `defer_application` tinyint(1) NOT NULL,
  `show_all_applications` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`ID`, `delete_application`, `set_executer`, `set_priority`, `accept_application`, `reset_application`, `defer_application`, `show_all_applications`) VALUES
('1f7fcc56-8a16-461a-8f73-4a96bf7802a0', 0, 0, 0, 1, 0, 1, 0),
('ffb8218e-c3ba-4f93-b28c-92abdccc1b3e', 1, 1, 1, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ID` varchar(60) NOT NULL,
  `ID_PERMISSION` varchar(60) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID`, `ID_PERMISSION`, `role`) VALUES
('4bc9554b-868e-4c01-a169-3696185a88d8', '1f7fcc56-8a16-461a-8f73-4a96bf7802a0', 'Executer'),
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
