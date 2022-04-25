const { Op } = require("sequelize");
const db = require("../models");
const { Comment } = require(__basedir + '/models');
class CommentService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const comment = await Comment.findOne({ where: { id: id } });
            res.status(200).send({ comment: comment });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Comments
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const comments = await Comment.findAndCountAll({
                where: {
                    commentName: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ comments: comments });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create Comment
    create = async (req, res) => {
        const body = req.body;

        // Create Comment
        try {
            const comment = await Comment.create(body);
            return res.status(200).send({ comment: comment });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Comment
    update = async (req, res) => {
        const body = req.body;
        try {
            const comment = await Comment.update(body, { where: { id: body.id } });

            return res.status(200).send({ comment: comment });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await Comment.destroy({
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

module.exports = new CommentService();
