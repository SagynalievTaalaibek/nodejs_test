const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default: () => randomUUID(),
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    first_name: String,
    last_name: String,
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    birthdate: Date,
});

// Метод для проверки пароля
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Метод для генерации нового токена
UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

// Хук перед сохранением
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Удаляем пароль из JSON-ответа
UserSchema.set('toJSON', {
    transform: function (_doc, ret) {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
