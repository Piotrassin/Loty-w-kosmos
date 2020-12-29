const express = require('express');
const router = express.Router();
const User = require('../model/user');
const validator = require('validator');

const currDate = new Date()
const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/

class ValidateUser {
    isValid(user) {
        return (validator.isLength(user.FirstName, {min: 3, max: 31}) &&
                (textReg.test(user.FirstName)) && 
                validator.isLength(user.LastName, {min: 3, max: 31}) &&
                (textReg.test(user.LastName)) && 
                (validator.isEmail(user.Email)) &&
                (currDate.getTime() > Date.parse(user.Birthdate)) &&
                (user.Weight > 9 && user.Weight < 1000));
    }
}
const validateUser = new ValidateUser;


router.get('/', (req, res, next) => {
    User.list()
    .then( ([userList, metadata]) => {
        res.json(userList);
    })
    .catch(e => {
        console.log(e);
    });
});

router.get('/:userId', (req, res, next) => {
    User.details(+req.params.userId).then( ([userDetails, metadata]) => {
        var details = userDetails
        res.json(details);
    })
    .catch(e => {
        console.log(e);
        res.json("Blędne zapytanie");
    });
});

router.post('/', (req, res, next) => {
    var newUser = req.body;

    if(validateUser.isValid(newUser)){
        User.add(newUser)
        .then( ([metadata]) => {
            res.status(201).json(newUser);
        })
        .catch(e => {
            res.status(400);
            console.log(e);
            res.json("Błędne dane wejściowe");
        });
    } else {
        res.status(400);
        console.log(e);
        res.json("Błędne dane wejściowe");
    }
});

router.put('/:userId', (req, res, next) => {
    var editedUser = req.body;
    editedUser.Id = +req.params.userId;

    if(validateUser.isValid(editedUser)) {
        User.edit(editedUser).then( ([metadata]) => {
            res.status(204);
        })
        .catch(e => {
            res.status(400);
            console.log(e);
            res.json("Błędne dane wejściowe");
        });
    } else {
        res.status(400);
        console.log(e);
        res.json("Błędne dane wejściowe");
    }
    
});

router.delete('/:userId', (req, res, next) => {
    User.delete(+req.params.userId)
    .then( ([metadata]) => {
        res.status(204).end();
    })
    .catch(e => {
        console.log(e);
        res.json("Blędne dane wejściowe");
    });
});

module.exports.route = router;