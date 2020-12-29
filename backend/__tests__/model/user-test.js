const User = require('../../model/user');

//resetowanie stanu bazy danych przed każdym testem
beforeEach(() => {
    User.initData();  
});

test('listTest()', () => {
    const users = User.list();
    expect(users.length).toBe(2); 
});

test('addTest()', () => {
    const newUser = new User("Sławomir", "Kowal", 17685975869, 95, 'slawo@mir.pl');
    User.add(newUser);
    const users = User.list();
    expect(users.length).toBe(3);
    const addedUser = users[2];
    expect(addedUser.firstName).toBe("Sławomir"); 
    expect(addedUser.lastName).toBe("Kowal");
});

test('editTest()', () => {
    const editUser = User.details(1);
    expect(editUser.firstName).toBe("Anna");
    expect(editUser.lastName).toBe('Wiśniewska');
    editUser.firstName = "Adam";
    editUser.lastName = "Małysz";
    User.edit(editUser);
    const changedUser = User.details(1);
    expect(changedUser.firstName).toBe("Adam");
    expect(changedUser.lastName).toBe("Małysz");
});

test('deleteTest()', () => {
    expect(User.list().length).toBe(2);
    var newUser = User.add(new User("AAA", "BBB"));
    expect(User.list().length).toBe(3);
    User.delete(newUser.id);
    expect(User.list().length).toBe(2);
});

test('detailsTest()', () => {
    const detailedUser = User.details(0);
    expect(detailedUser.firstName).toBe("Jan");
    expect(detailedUser.lastName).toBe("Kowalski");
});