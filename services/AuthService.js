/**
 * Service - AuthService
 * A Service Helper that handles the Authorization of Users
 */

const { User } = require(__basedir + '/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    // register user
    register = async (req, res) => {
        const { username, fullname, email, password, confirm_password, role, parent_uuid } = req.body;

        try {
            const parent = await User.findOne({ where: { uuid: parent_uuid } });

            // Validate Confirmed Password
            if (password != confirm_password) throw [{ message: 'passwords must match' }];

            // Hashing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Build Arguments
            const args = {
                fullname: fullname,
                username: username,
                email: email,
                password: hashedPassword,
                role: role
            };

            if (parent) args.parent_id = parent.id;

            // Create User
            const user = await User.create(args);

            // Send Response
            res.status(200).send(user);
        } catch (err) {
            // Send Error
            if (err.errors) res.status(400).send(err.errors);
            else res.status(400).send(err);
        }
    }

    // login user
    login = async (req, res) => {
        const { username, password } = req.body;

        try {
            // Find User by Username
            const user = await User.findOne({ where: { username: username }});
            
            // Check If User Exists
            if (user == null) throw [{ message: "user doesn't exist or password entered is invalid." }];

            // Check If Password Matches
            const validPassword = await bcrypt.compare(password, user.password);
            if (! validPassword) throw [{ message: "user doesn't exist or password entered is invalid." }];

            // Create Access and Refresh Token
            const accessToken = this.generateAccessToken(user);

            // Store AccessToken in Session
            req.session.accessToken = accessToken;

            res.status(200).send({
                user: user
            });
        }
        catch (err) {
            res.status(400).send(err);
        }
    }

    authenticate = (req, res) => {
        const accessToken = req.session.accessToken;

        if (accessToken == null) return res.sendStatus(401);

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, uuid) => {
            if (err) return res.sendStatus(403);

            res.status(200).send('user logged in');
        });
    }

    // logout user
    logout = (req, res) => {
        req.session.accessToken = null;

        return res.status(200).send('user logged out');
    }

    // Generate an Access Token
    generateAccessToken = (user) => {
        return jwt.sign({ uuid: user.uuid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    }
}

module.exports = new AuthService();