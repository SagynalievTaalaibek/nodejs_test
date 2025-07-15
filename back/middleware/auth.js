const User = require('../modules/users/user.model');

// Middleware to check user authentication by token
const auth = async (req, res, next) => {
    const headerValue = req.get('Authorization');

    // Check if Authorization header exists
    if (!headerValue) {
        return res.status(401).send({ error: 'No Authorization header present!' });
    }

    // Get token from header ("Bearer token")
    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
        return res.status(401).send({ error: 'No token present!' });
    }

    try {
        // Find user by token
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(401).send({ error: 'Wrong token!' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (e) {
        return res.status(500).send({ error: 'Server error during auth' });
    }
};

module.exports = auth;
