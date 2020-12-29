const express = require('express');
const router = express.Router();
const Flight = require('../model/flight');

const validator = require('validator');
const moment = require('moment');
const availableBodies = ['Mars', 'Ziemia', 'Pluton', 'Neptun', 'Księżyc', 'Merkury', 'Uran', 'Saturn']

class ValidateFlight {
    isValid(flight) {
        return (moment(flight.DepDate, "YYYY-MM-DD HH:mm:ss") && 
                moment(flight.ArrDate, "YYYY-MM-DD HH:mm:ss") &&
               (validator.isIn(flight.Origin, availableBodies)) &&
               (validator.isIn(flight.Destination, availableBodies)));
    }
}
const validateFlight = new ValidateFlight;


router.get('/', (req, res, next) => {
    Flight.list()
        .then( ([flightList, metadata]) => {
            res.json(flightList);
        })
        .catch(e => {
            console.log(e);
        });
});

router.get('/:flightId', (req, res, next) => {
    Flight.details(+req.params.flightId).then( ([flightDetails, metadata]) => {
        var details = flightDetails
        res.json(details);
    })
    .catch(e => {
        console.log(e);
        res.json("Blędne zapytanie");
    });
});

router.post('/', (req, res, next) => {
    const newFlight = req.body;

    if(validateFlight.isValid(newFlight)) {
        Flight.add(newFlight).then( ([metadata]) => {
            res.status(201).json(newFlight);
        })
        .catch(e => {
            res.status(400);
            console.log(e);
            res.json("Błędne dane wejściowe");
        });
    }else {
        res.status(400);
        res.json("Błędne dane wejściowe");
    }

});

router.put('/:flightId', (req, res, next) => {
    var editedFLight = req.body;
    editedFLight.Id = +req.params.flightId;

    if(validateFlight.isValid(editedFLight)) {
        Flight.edit(editedFLight).then( ([editedFLight, metadata]) => {
            res.status(204).json(editedFLight);
        })
        .catch(e => {
            console.log(e);
            res.json("Blędne dane wejściowe");
        });
    }else {
        res.status(400);
        res.json("Błędne dane wejściowe");
    }
});

router.delete('/:flightId', (req, res, next) => {
    Flight.delete(+req.params.flightId)
    .then( ([metadata]) => {
        res.status(204).end();
    })
    .catch(e => {
        console.log(e);
        res.json("Blędne dane wejściowe");
    });
});

module.exports.route = router;