const User = require("../users/user.model");

// Login user by username and password
const loginUser = async ({username, password}) => {
    const user = await User.findOne({ username });

    if (!user) {
        const error = new Error('Username not found!');
        error.statusCode = 422;
        throw error;
    }

    // Check if password is correct
    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        const error = new Error('Password is wrong!');
        error.statusCode = 422;
        throw error;
    }

    // Generate new token for user session
    user.generateToken();
    await user.save();

    return { user };
}

// Find user by token
const findByToken = async (token) => {
    return  User.findOne({ token });
}

module.exports = {
    loginUser,
    findByToken,
};
