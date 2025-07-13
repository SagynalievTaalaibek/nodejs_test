const User = require('./user.model');

// Создать нового пользователя
const createUser = async (data) => {
    const user = new User(data); // пароль уже хэшируется в pre-save
    return await user.save();
};

// Получить всех пользователей
const getAllUser = async (sort = 'username') => {
    return User.find().sort({ [sort]: 1 });
};

// Найти пользователя по ID
const findByIdUser = async (id) => await User.findById(id);

// Обновить пользователя
const updateUser = async (id, data) => await User.findByIdAndUpdate(id, data);

// Удалить пользователя
const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = {
    getAllUser,
    createUser,
    findByIdUser,
    updateUser,
    deleteUser,
};
