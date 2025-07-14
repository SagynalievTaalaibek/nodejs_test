const {
    loginUser,
    findByToken,
} = require('../auth/auth.service');


const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user } = await loginUser({ username, password });
        res.json({ message: 'Email and password are correct!', user });
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

const logout = async (req, res) => {
    try {
        const headerValue = req.get('Authorization');
        const successMessage = { message: 'Success!' };

        if (!headerValue) {
            return res.json(successMessage);
        }

        const [, token] = headerValue.split(' ');

        if (!token) {
            return res.json(successMessage);
        }

        const user = await findByToken(token);

        if (!user) {
            return res.json(successMessage);
        }

        user.generateToken();
        await user.save();

        res.json(successMessage);
    } catch (e) {
        res.status(500).json({ error: 'Server error during logout' });
    }
}

module.exports = {
    login,
    logout,
};
