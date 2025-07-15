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

// Method to check user password
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Method to generate new token
UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

// Hash password before saving to DB
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

// Remove password from JSON output
UserSchema.set('toJSON', {
    transform: function (_doc, ret) {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
