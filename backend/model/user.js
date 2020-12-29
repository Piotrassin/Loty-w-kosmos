const db = require('../db/mysql');

class User {

    constructor(fname, lname, bday, weight, email, id){
        this.FirstName = fname,
        this.LastName = lname,
        this.Birthdate = bday,
        this.Weight = weight,
        this.Email = email,
        this.Id = id
    }

    static add(user){
        return db.execute(
            'INSERT INTO User (`FirstName`, `LastName`, `Birthdate`, `Weight`, `Email`) VALUES (?, ?, ?, ?, ?)',
            [user.FirstName,
            user.LastName,
            user.Birthdate,
            user.Weight,
            user.Email]
        );
    }

    static list() {
        return db.execute('SELECT * FROM User');
    }

    static edit(editedUser) {
        return db.execute(
            'UPDATE User SET FirstName = ?, LastName = ?, Birthdate = ?, Weight = ?, Email = ? WHERE Id = ?',
            [editedUser.FirstName,
            editedUser.LastName,
            editedUser.Birthdate,
            editedUser.Weight,
            editedUser.Email,
            editedUser.Id]
        );
    }

    static delete(_id){
        return db.execute('DELETE FROM User WHERE Id = ?', [_id]);
    }

    static details(_id){
        return db.execute('SELECT * FROM User WHERE Id = ?', [_id]);
    }

}

module.exports = User;