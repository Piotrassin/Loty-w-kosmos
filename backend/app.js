const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


const userService = require('./api/userService');
app.use('/api/users', userService.route);

const flightService = require('./api/flightService');
app.use('/api/flights', flightService.route);

const ticketService = require('./api/ticketService');
app.use('/api/tickets', ticketService.route);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});