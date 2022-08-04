const testList = [
    {
        id: 1,
        username: 'test',
        password: 'test',
    },
    {
        id: 2,
        username: 'test2',
        password: 'test2',
    },
];

class Users {
    constructor(list = testList, created_at, updated_at) {
        this.list = list;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    findAllUsers() {
        return this.list;
    }
    findUserByUsername(username) {
        return this.list.find((user) => user.username === username);
    }
    findUserById(id) {
        return this.list.find((user) => user.id === id);
    }
    insertOneUser(user) {
        this.list.push(user);
        return user;
    }
    updateUser(id, user) {
        const index = this.list.findIndex((u) => u.id === id);
        this.list[index] = user;
    }
    deleteUser(id) {
        const index = this.list.findIndex((u) => u.id === id);
        this.list.splice(index, 1);
    }
}

export default new Users(testList, new Date(), new Date());
