
// Middleware to allow access only to specified roles
const permit = (...roles) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).send({ error: 'Not authenticated!' });
        }

        // Check if user's role is allowed
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Not authorized!' });
        }

        return next();
    };
};

module.exports = permit;
