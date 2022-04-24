/**
 * Service - UserService
 * A Service Helper that handles the Users
 */

const { User } = require(__basedir + '/models');

class UserService {
    // Get User
    get = (req, res) => {
        if (! req.user) res.sendStatus(403);

        // Send the User
        res.status(200).send(req.user);
    }
}

module.exports = new UserService();