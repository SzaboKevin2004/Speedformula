-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 03. 08:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `speedformula`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `uzenet` text NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `chat`
--

INSERT INTO `chat` (`id`, `felhasznalo_id`, `uzenet`, `createdAt`) VALUES
(1, 5, 'just yoke ', '2025-02-03 07:39:25');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasználó`
--

CREATE TABLE `felhasználó` (
  `id` int(11) NOT NULL,
  `felhasznalonev` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(80) NOT NULL,
  `szerep_id` int(11) DEFAULT NULL,
  `tema_id` int(11) NOT NULL,
  `kep` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasználó`
--

INSERT INTO `felhasználó` (`id`, `felhasznalonev`, `email`, `password`, `szerep_id`, `tema_id`, `kep`) VALUES
(3, 'szabvin', 'szabvink@gmail.com', '$2b$10$1HsX015BgJGujbdPHCxYjOrAXDmyT64j402XxlZZAFIkqLWZXd2BO', 2, 2, 2),
(4, 'csokiskeksz', 'csoki@gmail.com', '$2b$10$QUyXCpF6n1w69WohUmqODerWDizYETlTg69rIfTL2fwC.XWNMaH7W', 2, 1, 0),
(5, 'teszt1234', '1tesztdavidhorvath@gmail.com', '$2b$10$AaZ1mOOgzEUaOJ72FCextefKFk/fcCSj0NRcKRGMt4/KNDjlaH5jK', 1, 3, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerep`
--

CREATE TABLE `szerep` (
  `id` int(11) NOT NULL,
  `szerep_neve` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szerep`
--

INSERT INTO `szerep` (`id`, `szerep_neve`) VALUES
(1, 'admin'),
(2, 'felhasználó');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `felhasználó_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `felhasználó`
--
ALTER TABLE `felhasználó`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasználónév` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `szerep_id` (`szerep_id`);

--
-- A tábla indexei `szerep`
--
ALTER TABLE `szerep`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `felhasználó_id` (`felhasználó_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `szerep`
--
ALTER TABLE `szerep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasználó` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  ADD CONSTRAINT `felhasználó_ibfk_1` FOREIGN KEY (`szerep_id`) REFERENCES `szerep` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`felhasználó_id`) REFERENCES `felhasználó` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
