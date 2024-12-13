-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 18 nov. 2024 à 00:09
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_pointage`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `idAdmin` int(11) NOT NULL,
  `passwordAdmin` text NOT NULL,
  `nomAdmin` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`idAdmin`, `passwordAdmin`, `nomAdmin`) VALUES
(3, 'sky@net777', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `agents`
--

CREATE TABLE `agents` (
  `idAgent` int(11) NOT NULL,
  `nomClient` varchar(25) NOT NULL,
  `postnomClient` varchar(25) NOT NULL,
  `prenomClient` varchar(25) NOT NULL,
  `datedenaissance` date NOT NULL,
  `lieudenaissance` text NOT NULL,
  `matricule` varchar(25) NOT NULL,
  `division` text NOT NULL,
  `passwordClient` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `agents`
--

INSERT INTO `agents` (`idAgent`, `nomClient`, `postnomClient`, `prenomClient`, `datedenaissance`, `lieudenaissance`, `matricule`, `division`, `passwordClient`) VALUES
(1, 'Kamanda', 'Muleka', 'Joseph', '1994-10-31', 'Kinshasa', '75074', 'Informatique', 'passe001'),
(2, 'Kilande', 'Buanga', 'Elise', '1989-04-13', 'Ilebo', '75069', 'Budgétisation', 'passe002'),
(3, 'Bolafa', 'Binene', 'Emmanuel', '1997-03-27', 'Kalemi', '75082', 'Programmation', 'passe003');

-- --------------------------------------------------------

--
-- Structure de la table `pointage`
--

CREATE TABLE `pointage` (
  `idPointage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `scans`
--

CREATE TABLE `scans` (
  `idScanner` int(11) NOT NULL,
  `idAgent` int(11) DEFAULT NULL,
  `nomScan` varchar(255) NOT NULL,
  `scan_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Index pour la table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`idAgent`);

--
-- Index pour la table `pointage`
--
ALTER TABLE `pointage`
  ADD PRIMARY KEY (`idPointage`);

--
-- Index pour la table `scans`
--
ALTER TABLE `scans`
  ADD PRIMARY KEY (`idScanner`),
  ADD KEY `idAgent` (`idAgent`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateur`
--
ALTER TABLE `administrateur`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `agents`
--
ALTER TABLE `agents`
  MODIFY `idAgent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `pointage`
--
ALTER TABLE `pointage`
  MODIFY `idPointage` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `scans`
--
ALTER TABLE `scans`
  MODIFY `idScanner` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `scans`
--
ALTER TABLE `scans`
  ADD CONSTRAINT `scans_ibfk_1` FOREIGN KEY (`idAgent`) REFERENCES `agents` (`idAgent`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
