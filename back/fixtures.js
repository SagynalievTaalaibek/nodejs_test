const mongoose = require('mongoose');
const config = require('./config/config');
const User = require('./modules/users/user.model');

const dropCollection = async (db, collectionName) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const characters = [
    {first_name: 'Harry', last_name: 'Potter', gender: 'male'},
    {first_name: 'Hermione', last_name: 'Granger', gender: 'female'},
    {first_name: 'Ron', last_name: 'Weasley', gender: 'male'},
    {first_name: 'Ginny', last_name: 'Weasley', gender: 'female'},
    {first_name: 'Draco', last_name: 'Malfoy', gender: 'male'},
    {first_name: 'Luna', last_name: 'Lovegood', gender: 'female'},
    {first_name: 'Neville', last_name: 'Longbottom', gender: 'male'},
    {first_name: 'Cho', last_name: 'Chang', gender: 'female'},
    {first_name: 'Fred', last_name: 'Weasley', gender: 'male'},
    {first_name: 'George', last_name: 'Weasley', gender: 'male'},
];

const randomBirthdate = () => {
    const start = new Date('1980-01-01').getTime();
    const end = new Date('2005-12-31').getTime();
    return new Date(start + Math.random() * (end - start));
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    await dropCollection(db, 'users');

    await User.create({
        username: 'admin',
        password: 'admin',
        role: 'admin',
        first_name: 'Taalaibek',
        last_name: 'Sagynaliev',
        gender: 'male',
        birthdate: new Date('2002-03-25'),
    });

    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        await User.create({
            username: char.first_name.toLowerCase(),
            password: 123456,
            first_name: char.first_name,
            last_name: char.last_name,
            gender: char.gender,
            birthdate: randomBirthdate(),
        });
    }

    console.log('All users successfully created');
    await db.close();
};

run().catch((e) => {
    console.error('Error running fixture:', e);
    mongoose.connection.close();
});
