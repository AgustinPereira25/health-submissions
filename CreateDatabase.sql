CREATE DATABASE IF NOT EXISTS submissionsDB;
USE submissionsDB;

CREATE TABLE `users` (
  `id` integer AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `role` varchar(255),
  `created_at` DATE
);

CREATE TABLE `patients` (
  `patientid` integer AUTO_INCREMENT PRIMARY KEY,
  `phone` varchar(255),
  `weight` varchar(255),
  `height` varchar(255),
  `otherInfo` varchar(255)
);

CREATE TABLE `doctors` (
  `doctorId` integer AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE `submissions` (
  `submissionId` integer AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255),
  `symptoms` varchar(255),
  `doctorId` integer NULL,
  `patientId` integer,
  `created_at` DATE,
  `status` varchar(255)
);

ALTER TABLE `patients` ADD FOREIGN KEY (`patientid`) REFERENCES `users` (`id`);

ALTER TABLE `doctors` ADD FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`);

-- ALTER TABLE `submissions` ADD FOREIGN KEY (`doctorId`) REFERENCES `doctors` (`doctorId`);

ALTER TABLE `submissions` ADD FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientid`);
