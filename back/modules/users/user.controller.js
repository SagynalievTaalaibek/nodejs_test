const {
    getAllUser,
    createUser,
    findByIdUser,
    updateUser,
    deleteUser,
} = require('../users/user.service');

const getUsers = async (req, res) => {
    try {
        const sort = req.query.sort || 'username';
        const users = await getAllUser(sort);
        res.json(users);
    } catch (e) {
        res.status(500).json({error: 'Server error'});
    }
};

const getUser = async (req, res) => {
    try {
        const user = await findByIdUser(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (e) {
        res.status(500).json({error: 'Server error'});
    }
};

const addUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({error: 'Error creating user'});
    }
};

const editUser = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json({message: 'User updated'});
    } catch (e) {
        res.status(500).json({error: 'Error updating user'});
    }
};

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
