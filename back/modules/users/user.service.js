const User = require('./user.model');

// Create a new user
const createUser = async ({username, password, first_name, last_name, gender, birthdate}) => {
    const user = new User({
        username,
        password,
        first_name,
        last_name,
        gender,
        birthdate,
    });
    return await user.save();
};

// Get all users with sorting
const getAllUser = async ({page = 1, limit = 10, sort = 'username', order = 'asc'}) => {
    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    const users = await User.find({role: 'user'})
        .select('username first_name last_name birthdate')
        .sort({[sort]: sortOrder})
        .skip(skip)
        .limit(Number(limit));

    const total = await User.countDocuments({role: 'user'});

    return {
        users,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
    };
};

// Find user by ID
const findByIdUser = async (id) => await User.findById(id);

// Update user by ID
const updateUser = async (id, {
    username,
    password,
    first_name,
    last_name,
    gender,
    birthdate
}) => await User.findByIdAndUpdate(id, {username, password, first_name, last_name, gender, birthdate});

// Delete user by ID
const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = {
    getAllUser,
    createUser,
    findByIdUser,
    updateUser,
    deleteUser,
};
