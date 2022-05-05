const { Op } = require("sequelize");
const db = require("../models");
const { Blog } = require(__basedir + '/models');
class BlogService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const blog = await Blog.findOne({ where: { id: id } });
            res.status(200).send({ blog: blog });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Blogs
    getAll = async (req, res) => {
        const { page = 0, limit = 50, search = "" } = req.query;
        try {
            const blogs = await Blog.findAndCountAll({
                where: {
                    title: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ blogs: blogs });
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
            const blog = await Blog.create(body);
            return res.status(200).send({ blog: blog });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Blog
    update = async (req, res) => {
        const body = req.body;
        try {
            const blog = await Blog.update(body, { where: { id: body.id } });

            return res.status(200).send({ blog: blog });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await Blog.destroy({
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

module.exports = new BlogService();
