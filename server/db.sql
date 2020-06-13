-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 13, 2020 at 12:48 PM
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
  `date_start` date NOT NULL DEFAULT '0000-00-00',
  `date_end` date NOT NULL DEFAULT '0000-00-00',
  `priority` int(11) NOT NULL DEFAULT 1,
  `full_name` text NOT NULL,
  `case_num` int(1) NOT NULL,
  `task` text NOT NULL,
  `phone_num` varchar(12) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'free',
  `count_executer` int(2) NOT NULL DEFAULT 1,
  `current_count_executers` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`ID`, `date`, `date_start`, `date_end`, `priority`, `full_name`, `case_num`, `task`, `phone_num`, `status`, `count_executer`, `current_count_executers`) VALUES
('kbdfs59s', '2020-05-13', '2020-05-06', '0000-00-00', 1, 'Федотов Евгений Борисович', 1, 'Сломался принтер. Что-то скрипит и дымиться внутри при включении', '+79871322456', 'process', 1, 1),
('kbdfvbva', '2020-05-13', '0000-00-00', '0000-00-00', 3, 'Ярышкина Ирина Васильевна', 2, 'Не работает проектор. Пишет, что есть подключение, но на движения не реагирует', '+79173132333', 'free', 1, 0),
('kbdfy19a', '2020-05-13', '0000-00-00', '0000-00-00', 1, 'Алушкина Ксения Андреевна', 1, 'Не включается компьютер. Уже и стучала по нему, но так и не включился. Пришлите человека', '+79175513190', 'free', 1, 0),
('kbdfznxs', '2020-05-13', '2020-05-06', '2020-05-06', 1, 'Петров Павел Евгеньевич', 1, 'Кончилась краска в принтере. Нужно заправить', '+88005553535', 'completed', 1, 1),
('kbdg2abw', '2020-05-13', '0000-00-00', '0000-00-00', 1, 'Семенов Геннадий Ашотович ', 2, 'Пришел новый проектор. Помогите настроить и повесить в аудиторию.', '+79199910365', 'pending', 3, 1);

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
('kbdgdlta', '9ad94158-c2e3-4aa5-929c-6cdef375587d', 'kbdg2abw'),
('kbdge844', '9ad94158-c2e3-4aa5-929c-6cdef375587d', 'kbdfznxs'),
('kbdgeotk', '9ad94158-c2e3-4aa5-929c-6cdef375587d', 'kbdfs59s');

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
('dff5142b-3f8a-4b53-b188-ed17ce3399de', 'maroolila56', '6c30734811916b0f0f24a4630b08036f', 'Ланина Мария Сергеевна', '4bc9554b-868e-4c01-a169-3696185a88d8'),
('f8b75df4-933d-45cb-b7de-6965ec7f772a', 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'Пользователь', 'fd0cc654-285e-418f-af1a-00d259fb33b2');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ID` varchar(60) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID`, `role`) VALUES
('4bc9554b-868e-4c01-a169-3696185a88d8', 'Executer'),
('d7717aeb-6917-4e96-bb4c-ec3f347498be', 'Administrator'),
('fd0cc654-285e-418f-af1a-00d259fb33b2', 'User');

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
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
