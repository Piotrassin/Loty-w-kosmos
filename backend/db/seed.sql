USE `loty-w-kosmos`;

INSERT INTO `Flight` (`DepDate`, `ArrDate`, `Description`, `Origin`, `Destination`) VALUES ('2023-02-13 18:45:00', '2024-9-13 10:00:00', 'Pierwszy lot na Marsa',  'Ziemia', 'Mars');
INSERT INTO `Flight` (`DepDate`, `ArrDate`, `Description`, `Origin`, `Destination`) VALUES ('2025-01-03 12:30:00', '2026-7-21 21:40:00', 'Powrót z Marsa', 'Mars', 'Ziemia');

INSERT INTO `User` (`FirstName`, `LastName`, `Birthdate`, `Weight`, `Email`) VALUES ('Adam', 'Kowalski', '1989-02-02', 80, 'a.kowalski@wp.pl');
INSERT INTO `User` (`FirstName`, `LastName`, `Birthdate`, `Weight`, `Email`) VALUES ('Zbigniew', 'Kokardka', '1972-06-21', 85, 'z.kokarda@wp.pl');
INSERT INTO `User` (`FirstName`, `LastName`, `Birthdate`, `Weight`, `Email`) VALUES ('Zygmunt', 'Bąk', '1968-08-12', 90, 'z.bak@wp.pl');
INSERT INTO `User` (`FirstName`, `LastName`, `Birthdate`, `Weight`, `Email`) VALUES ('Anna', 'Biedronka', '1996-09-01', 58, 'a.bied@wp.pl');
INSERT INTO `User` (`FirstName`, `LastName`, `Birthdate`, `Weight`, `Email`) VALUES ('Jolanta', 'Miska', '1980-02-11', 70, 'j.miska@wp.pl');

INSERT INTO `Ticket` (`SeatNumber`, `Price`, `LuggageMass`, `LuggageX`, `LuggageY`, `LuggageZ`, `Flight_Id`, `User_Id`) VALUES (13, 15000, 20.5, 60, 40, 90, 1, 2);
INSERT INTO `Ticket` (`SeatNumber`, `Price`, `LuggageMass`, `LuggageX`, `LuggageY`, `LuggageZ`, `Flight_Id`, `User_Id`) VALUES (31, 19500, 24, 70, 45, 85, 2, 2);