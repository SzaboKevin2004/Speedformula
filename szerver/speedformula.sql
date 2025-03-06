-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 24. 11:19
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasználó`
--

CREATE TABLE `felhasználó` (
  `id` int(11) NOT NULL,
  `felhasznalonev` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(80) NOT NULL,
  `passwordHosszusag` int(11) DEFAULT NULL,
  `szerep_id` int(11) DEFAULT NULL,
  `tema_id` int(11) NOT NULL,
  `kep` varchar(255) DEFAULT NULL,
  `magamrol` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasználó`
--

INSERT INTO `felhasználó` (`id`, `felhasznalonev`, `email`, `password`, `passwordHosszusag`, `szerep_id`, `tema_id`, `kep`, `magamrol`) VALUES
(1, 'teszt1234', '1tesztdavidhorvath@gmail.com', '$2b$10$Kx7M6c3aZfhwGVUicC59B.yYh0YV2wly3V91nZT61M3mtSAJwWdIq', 8, 1, 1, '../assets/pfp/pfp/pfp_cyan.png', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvenckomment`
--

CREATE TABLE `kedvenckomment` (
  `komment_id` int(11) NOT NULL,
  `kedveles` int(11) DEFAULT 0,
  `Megosztas` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvencposzt`
--

CREATE TABLE `kedvencposzt` (
  `poszt_id` int(11) NOT NULL,
  `kedveles` int(11) DEFAULT 0,
  `Megosztas` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kedvencposzt`
--

INSERT INTO `kedvencposzt` (`poszt_id`, `kedveles`, `Megosztas`) VALUES
(1, 2, 1),
(2, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `komment`
--

CREATE TABLE `komment` (
  `id` int(11) NOT NULL,
  `poszt_id` int(11) DEFAULT NULL,
  `szint` int(11) DEFAULT NULL,
  `kommentszulo_id` int(11) DEFAULT NULL,
  `komment` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `poszt`
--

CREATE TABLE `poszt` (
  `id` int(11) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `kep` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `poszt`
--

INSERT INTO `poszt` (`id`, `cim`, `user_id`, `body`, `kep`, `video`, `createdAt`) VALUES
(1, 'Lagzi lajcsi', 1, 'Buzi Hamilton', NULL, NULL, '2025-02-24 09:36:40'),
(2, 'Lagzi lajcsi', 1, 'Buzi Hamilton', NULL, NULL, '2025-02-24 09:36:42');

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
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `szerep_id` (`szerep_id`);

--
-- A tábla indexei `kedvenckomment`
--
ALTER TABLE `kedvenckomment`
  ADD PRIMARY KEY (`komment_id`);

--
-- A tábla indexei `kedvencposzt`
--
ALTER TABLE `kedvencposzt`
  ADD PRIMARY KEY (`poszt_id`);

--
-- A tábla indexei `komment`
--
ALTER TABLE `komment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poszt_id` (`poszt_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `poszt`
--
ALTER TABLE `poszt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `szerep`
--
ALTER TABLE `szerep`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `kedvenckomment`
--
ALTER TABLE `kedvenckomment`
  MODIFY `komment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kedvencposzt`
--
ALTER TABLE `kedvencposzt`
  MODIFY `poszt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `komment`
--
ALTER TABLE `komment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `poszt`
--
ALTER TABLE `poszt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `szerep`
--
ALTER TABLE `szerep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Megkötések a táblához `kedvenckomment`
--
ALTER TABLE `kedvenckomment`
  ADD CONSTRAINT `kedvenckomment_ibfk_1` FOREIGN KEY (`komment_id`) REFERENCES `komment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `kedvencposzt`
--
ALTER TABLE `kedvencposzt`
  ADD CONSTRAINT `kedvencposzt_ibfk_1` FOREIGN KEY (`poszt_id`) REFERENCES `poszt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `komment`
--
ALTER TABLE `komment`
  ADD CONSTRAINT `komment_ibfk_1` FOREIGN KEY (`poszt_id`) REFERENCES `poszt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `felhasználó` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `poszt`
--
ALTER TABLE `poszt`
  ADD CONSTRAINT `poszt_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `felhasználó` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
