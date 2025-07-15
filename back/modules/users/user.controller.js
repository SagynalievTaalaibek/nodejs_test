const {
    getAllUser,
    createUser,
    findByIdUser,
    updateUser,
    deleteUser,
} = require('../users/user.service');
const User = require('./user.model');

// Get list users with sorting
const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'username';
        const order = req.query.order || 'asc';

        const result = await getAllUser({page, limit, sort, order});

        res.json(result);
    } catch (e) {
        res.status(500).json({error: 'Server error'});
    }
};

// Get one user by id with full info
const getUser = async (req, res) => {
    try {
        const user = await findByIdUser(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (e) {
        res.status(500).json({error: 'Server error'});
    }
};

// Add new user
const addUser = async (req, res) => {
    try {
        const {username, password, first_name, last_name, gender, birthdate} = req.body;

        if (!username || !password) {
            return res.status(400).json({error: 'Username and password are required'});
        }

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(409).json({error: 'Username already exists'});
        }

        const user = await createUser({username, password, first_name, last_name, gender, birthdate});

        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({error: 'Error creating user'});
    }
};

// Update user by id
const editUser = async (req, res) => {
    try {
        const {username, password, first_name, last_name, gender, birthdate} = req.body;
        const userId = req.params.id;

        const existingUser = await User.findOne({username, _id: {$ne: userId}});
        if (existingUser) {
            return res.status(400).json({error: 'Username already exists'});
        }


        const user = await updateUser(userId, {username, password, first_name, last_name, gender, birthdate});
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json({message: 'User updated'});
    } catch (e) {
        res.status(500).json({error: 'Error updating user'});
    }
};

// Delete user by id
const removeUser = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json({message: 'User deleted'});
    } catch (e) {
        res.status(500).json({error: 'Error deleting user'});
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    removeUser,
};
