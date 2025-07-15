const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const config = require('./config/config');
const userRoutes = require('./modules/users/user.routes');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const run = async () => {
    try {
        await mongoose.connect(config.mongoose.db);

        app.listen(port, () => {
            console.log(`Server started on ${port} port!`);
        });

        process.on('exit', () => {
            mongoose.disconnect();
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

void run();