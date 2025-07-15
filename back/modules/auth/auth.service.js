const User = require("../users/user.model");


const loginUser = async ({username, password}) => {
    const user = await User.findOne({ username });

    if (!user) {
        const error = new Error('Username not found!');
        error.statusCode = 422;
        throw error;
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        const error = new Error('Password is wrong!');
        error.statusCode = 422;
        throw error;
    }

    user.generateToken();
    await user.save();

    return { user };
}


const findByToken = async (token) => {
    return  User.findOne({ token });
}

module.exports = {
    loginUser,
    findByToken,
};
