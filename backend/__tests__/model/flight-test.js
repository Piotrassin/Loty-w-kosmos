const Flight = require('../../model/flight');

//resetowanie stanu bazy danych przed każdym testem
beforeEach(() => {
    Flight.initData();  
});

test('listTest()', () => {
    const flights = Flight.list();
    expect(flights.length).toBe(4); 
});

test('addTest()', () => {
    expect(flights.length).toBe(4);
    const newFlight = new Flight("20.02.2022", "Ziemia", "Księżyc", 95, "Przygoda III");
    Flight.add(newFlight);
    const flights = Flight.list();
    expect(flights.length).toBe(5);
    const addedFlight = flights[4];
    expect(addedFlight.date).toBe("20.02.2022"); 
    expect(addedFlight.shipName).toBe("Przygoda III");
});

test('editTest()', () => {
    const editFlight = Flight.details(1);
    expect(editFlight.date).toBe("14.08.2020");
    expect(editFlight.origin).toBe('Ziemia');
    editFlight.date = "24.11.2020";
    editFlight.origin = "Ziemia";
    Flight.edit(editFlight);
    const changedFlight = Flight.details(1);
    expect(changedFlight.date).toBe("24.11.2020");
    expect(changedFlight.origin).toBe("Ziemia");
});

test('deleteTest()', () => {
    expect(Flight.list().length).toBe(4);
    var newFlight = Flight.add(new Flight("1.01.2022", "Mars", "Fobos", 20, "Prom I"));
    expect(Flight.list().length).toBe(5);
    Flight.delete(newFlight.id);
    expect(Flight.list().length).toBe(4);
});

test('detailsTest()', () => {
    const detailedUser = Flight.details(0);
    expect(detailedUser.date).toBe("26.03.2022");
    expect(detailedUser.origin).toBe("Ziemia");
});