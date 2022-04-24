const { Op } = require("sequelize");
const db = require("../models");
const { Blog } = require(__basedir + '/models');
class BlogService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const type = await Blog.findOne({ where: { id: id } });
            res.status(200).send({ type: type });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Blogs
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const types = await Blog.findAndCountAll({
                where: {
                    typeName: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ types: types });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create Blog
    create = async (req, res) => {
        const body = req.body;

        // Create Blog
        try {
            const type = await Blog.create(body);
            return res.status(200).send({ type: type });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Blog
    update = async (req, res) => {
        const body = req.body;
        try {
            const type = await Blog.update(body, { where: { id: body.id } });

            return res.status(200).send({ type: type });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };
}

module.exports = new BlogService();
