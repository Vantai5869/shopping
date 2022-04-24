const jwt = require('jsonwebtoken');
const { User } = require(__basedir + '/models');

module.exports.authenticate = (req, res, next) => {
    const accessToken = req.session.accessToken;

    if (accessToken == null) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) return res.sendStatus(403);

        // Get User from Token UUID
        const user = await User.findOne({ where: { uuid: payload.uuid } });

        // Set the user to user
        req.user = user;

        next();
    });
}