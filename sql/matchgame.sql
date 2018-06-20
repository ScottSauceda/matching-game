-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2018 at 03:05 PM
-- Server version: 5.6.37
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matchgame`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `IDmbr` int(6) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `user` varchar(15) NOT NULL,
  `pswd` varchar(256) NOT NULL,
  `joinTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`IDmbr`, `firstName`, `lastName`, `email`, `user`, `pswd`, `joinTime`) VALUES
(1, 'Marcus', 'Sauceda', 'sauceda_m@sbcglobal.net', 'MSS', '123', '2018-06-05 19:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `IDscore` int(5) NOT NULL,
  `mbrID` int(3) NOT NULL,
  `score` int(6) NOT NULL,
  `seconds` int(5) NOT NULL,
  `attempts` int(4) NOT NULL,
  `matches` int(3) NOT NULL,
  `average` float NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`IDscore`, `mbrID`, `score`, `seconds`, `attempts`, `matches`, `average`, `dateTime`) VALUES
(1, 1, 123456, 135, 36, 12, 0.333, '2018-06-05 19:35:23'),
(2, 1, 48000, 2, 1, 1, 1, '2018-06-19 18:39:15'),
(3, 1, 36000, 3, 1, 1, 1, '2018-06-19 18:45:43'),
(4, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:07:37'),
(5, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:28:21'),
(6, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:29:14'),
(7, 1, 48000, 2, 1, 1, 1, '2018-06-19 19:44:17'),
(8, 1, 72000, 1, 1, 1, 1, '2018-06-19 19:49:28'),
(9, 1, 72000, 1, 1, 1, 1, '2018-06-19 19:49:30'),
(10, 1, 48000, 2, 1, 1, 1, '2018-06-19 19:51:32'),
(11, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:54:17'),
(12, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:54:19'),
(13, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:54:19'),
(14, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:54:19'),
(15, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:54:20'),
(16, 1, 144000, 0, 1, 1, 1, '2018-06-19 19:54:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`IDmbr`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`IDscore`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `IDmbr` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `IDscore` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
