const Ticket = require('../../model/ticket');

//resetowanie stanu bazy danych przed każdym testem
beforeEach(() => {
    Ticket.initData();  
});

test('listTest()', () => {
    const tickets = Ticket.list();
    expect(tickets.length).toBe(2); 
});

test('addTest()', () => {
    const newTicket = new Ticket(1, 1, 19, 95, 60, 30);
    Ticket.add(newTicket);
    const tickets = Ticket.list();
    expect(tickets.length).toBe(3);
    const addedTicket = tickets[2];
    expect(addedTicket.userId).toBe(1); 
    expect(addedTicket.flightId).toBe(1);
});

test('editTest()', () => {
    const editTicket = Ticket.details(1);
    expect(editTicket.userId).toBe(1);
    expect(editTicket.flightId).toBe(1);
    editTicket.userId = 2;
    editTicket.flightId = 0;
    Ticket.edit(editTicket);
    const changedTicket = Ticket.details(1);
    expect(changedTicket.userId).toBe(2);
    expect(changedTicket.flightId).toBe(0);
});

test('deleteTest()', () => {
    expect(Ticket.list().length).toBe(2);
    var newTicket = Ticket.add(new Ticket(1, 0, 10, 40, 60, 40));
    expect(Ticket.list().length).toBe(3);
    Ticket.delete(newTicket.id);
    expect(Ticket.list().length).toBe(2);
});

test('detailsTest()', () => {
    const detailedTicket = Ticket.details(0);
    expect(detailedTicket.userId).toBe(0);
    expect(detailedTicket.flightId).toBe(0);
});