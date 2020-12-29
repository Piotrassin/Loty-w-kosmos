const db = require('../db/mysql');

class Flight {

    constructor(depDate, arrDate, description, origin, destination, Id) {
        this.DepDate = depDate;
        this.ArrDate = arrDate;
        this.Description = description;
        this.Origin = origin;
        this.Destination = destination;
        this.Id = Id;
    }

    static add(flight) {
        return db.execute(  
            'insert into Flight (`DepDate`, `ArrDate`, `Description`, `Origin`, `Destination`) ' +
            'values (?, ?, ?, ?, ?)',
            [flight.DepDate, 
            flight.ArrDate, 
            flight.Description, 
            flight.Origin, 
            flight.Destination]
        );
    }

    static list() {
        return db.execute('SELECT * FROM Flight');
    }

    static edit(editedFlight) {
        return db.execute(
            'UPDATE Flight ' +
            'SET DepDate = ?, ArrDate = ?, Description = ?, Origin = ?, Destination = ? ' + 
            'WHERE Id = ?',
            [editedFlight.DepDate, 
            editedFlight.ArrDate, 
            editedFlight.Description, 
            editedFlight.Origin, 
            editedFlight.Destination,
            editedFlight.Id]
        );
    }

    static delete(_id) {
        return db.execute(' DELETE FROM FLIGHT WHERE Id = ?', [_id]);
    }

    static details(_id) {
        return db.execute('SELECT * FROM FLIGHT WHERE Id = ?', [_id]);
    }
}

module.exports = Flight;
