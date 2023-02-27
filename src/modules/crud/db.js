const { faker } = require('@faker-js/faker')

function createRandomUser(id) {
    return {
        id,
        first_name: faker.internet.userName(),
        last_name: faker.internet.userName(),
        email: faker.internet.email(),
        gender: faker.name.gender(),
        ip_address: faker.internet.ipv4(),
        last_login: faker.date.past(1).getTime() / 1000,
    }
}

function createRandomPost() {
    return {
        id: faker.datatype.number(),
        title: faker.lorem.words(),
        content: faker.lorem.words(100),
        date: faker.date.recent().toISOString(),
        userId: faker.datatype.number({ min: 0, max: 1001 }),
    }
}

module.exports = () => {
    const data = { users: [], posts: [] }
    for (let i = 0; i < 1001; i++) {
        data.users.push(createRandomUser(i))
        data.posts.push(createRandomPost())
    }
    return data
}
