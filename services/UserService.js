const { Op } = require("sequelize");
const db = require("../models");
const { User } = require(__basedir + '/models');
class UserService {
    
    getMe = async (req, res) => {
       if(!req.user){
        if (err) res.status(403);
       }
        try {
            const user = await User.findOne({ where: { id: req.user.email.idUser } });
            res.status(200).send({ user: user });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    get = async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ where: { id: id } });
            res.status(200).send({ user: user });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Users
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const users = await User.findAndCountAll({
                distinct: true,
                where: {
                    fullName: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ users: users });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create User
    create = async (req, res) => {
        const body = req.body;

        // Create User
        try {
            const user = await User.create(body);
            return res.status(200).send({ user: user });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update User
    update = async (req, res) => {
        const body = req.body;
        try {
            const user = await User.update(body, { where: { id: body.id } });

            return res.status(200).send({ user: user });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Update User
    updateMe = async (req, res) => {
        const body = req.body;
        try {
            const user = await User.update(body, { where: { id: req.user.email.idUser } });
            return res.status(200).send({ user: user });
        } catch (err) {
            console.log("============");
            console.log(body);
            console.log(err);
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await User.destroy({
                where: {
                    id:body.id
                }
            })
            return res.status(200).send({ result: result });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };
}

module.exports = new UserService();
