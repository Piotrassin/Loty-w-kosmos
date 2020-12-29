const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket');

const validator = require('validator');

class ValidateTicket {
    isValid(ticket) {
        var ticketPrice = parseInt(ticket.Price);
        var luggMass = parseInt(ticket.LuggageMass);
        return (
            ticket.SeatNumber > 0 
            && ticket.SeatNumber <= 50 
            && ticketPrice > 7999
            && ticketPrice <= 20000
            && luggMass > 0
            && luggMass <= 100
            && ticket.LuggageX > 0
            && ticket.LuggageX <= 100
            && ticket.LuggageY > 0
            && ticket.LuggageY <= 100
            && ticket.LuggageZ > 0
            && ticket.LuggageZ <= 100
        );
    }
}
const validateTicket = new ValidateTicket;


router.get('/', (req, res, next) => {
    Ticket.list()
        .then( ([ticketList, metadata]) => {
            res.json(ticketList);
        })
        .catch(e => {
            console.log(e);
        });
});

router.get('/:ticketId', (req, res, next) => {
    Ticket.details(+req.params.ticketId).then( ([ticketDetails, metadata]) => {
        res.json(ticketDetails);
    })
    .catch(e => {
        console.log(e);
        res.json("Blędne zapytanie");
    });
});

router.post('/', (req, res, next) => {
    const newTicket = req.body;

    if(validateTicket.isValid(newTicket)) {
        Ticket.add(newTicket)
            .then( ([newTicket1, metadata]) => {
                res.status(201).json(newTicket);
            })
            .catch(e => {
                res.status(400);
                console.log(e);
                res.json("Blędne dane wejściowe");
            });
    } else {
        res.status(400);
        console.log(e);
        res.json("Blędne dane wejściowe");
    }
});

router.put('/:ticketId', (req, res, next) => {
    var editedTicket = req.body;
    editedTicket.Id = +req.params.ticketId;

    if(validateTicket.isValid(editedTicket)) {
        Ticket.edit(editedTicket).then( ([editedTicket, metadata]) => {
            res.status(204).json(editedTicket);
        })
        .catch(e => {
            console.log(e);
            res.json("Blędne dane wejściowe");
        });
    } else {
        console.log(e);
        res.json("Blędne dane wejściowe");
    }
});

router.delete('/:ticketId', (req, res, next) => {
    Ticket.delete(+req.params.ticketId)
    .then( ([metadata]) => {
        res.status(204).json(metadata);
    })
    .catch(e => {
        console.log(e);
        res.json("Blędne dane wejściowe");
    });
});

module.exports.route = router;