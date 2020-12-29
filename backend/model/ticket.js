const db = require('../db/mysql');

class Ticket {
    constructor(seatNumber, price, luggageWeight, luggageX, luggageY, luggageZ, flightId, userId, id) {
        this.SeatNumber = seatNumber;
        this.Price = price;
        this.LuggageMass = luggageWeight;
        this.LuggageX = luggageX;
        this.LuggageY = luggageY;
        this.LuggageZ = luggageZ;
        this.Flight_Id = flightId;
        this.User_Id = userId;
        this.Id = id;
    }

    static add(ticket) {
        return db.execute(
            'INSERT INTO Ticket (SeatNumber, Price, LuggageMass, LuggageX, LuggageY, LuggageZ, Flight_Id, User_Id) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ticket.SeatNumber,
            ticket.Price,
            ticket.LuggageMass,
            ticket.LuggageX,
            ticket.LuggageY,
            ticket.LuggageZ,
            ticket.Flight_Id,
            ticket.User_Id]
        );
    }

    static list() {
        return db.execute(
            `SELECT 
                Ticket.Id, 
                Ticket.SeatNumber, 
                Ticket.Price, 
                Ticket.LuggageMass, 
                Ticket.LuggageX, 
                Ticket.LuggageY, 
                Ticket.LuggageZ,
                Ticket.Flight_Id,
                Ticket.User_Id,
                Flight.DepDate,
                Flight.ArrDate,
                Flight.Origin,
                Flight.Destination,
                User.FirstName,
                User.LastName
             FROM Ticket 
            JOIN Flight 
                ON Ticket.Flight_Id = Flight.Id
            JOIN User
                ON Ticket.User_Id = User.Id`);
    }

    static edit(editedTicket) {
        return db.execute(
            'UPDATE Ticket SET ' +
            'SeatNumber = ?, ' +
            'Price = ?, ' +
            'LuggageMass = ?, ' +
            'LuggageX = ?, ' +
            'LuggageY = ?, ' +
            'LuggageZ = ?, ' +
            'Flight_Id = ?, ' +
            'User_Id = ? WHERE Id = ?',
            [editedTicket.SeatNumber,
            editedTicket.Price,
            editedTicket.LuggageMass,
            editedTicket.LuggageX,
            editedTicket.LuggageY,
            editedTicket.LuggageZ,
            editedTicket.Flight_Id,
            editedTicket.User_Id,
            editedTicket.Id]
        );
    }

    static delete(_id) {
        return db.execute('DELETE FROM Ticket WHERE Id = ?', [_id]);
    }

    static details(_id) {
        return db.execute(
            `SELECT * FROM Ticket 
            JOIN User ON Ticket.User_Id = User.Id 
            JOIN Flight ON Ticket.Flight_Id = Flight.Id 
            WHERE Ticket.Id = ?`, [_id]);
    }
}

module.exports = Ticket;
