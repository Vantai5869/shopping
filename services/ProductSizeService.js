const { Op } = require("sequelize");
const { ProductSize } = require(__basedir + '/models');
class ProductSizeService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const productSize = await ProductSize.findOne({ where: { id: id } });
            res.status(200).send({ productSize: productSize });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All ProductSizes
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const productSizes = await ProductSize.findAndCountAll({
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ productSizes: productSizes });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create ProductSize
    create = async (req, res) => {
        const body = req.body;

        // Create ProductSize
        try {
            const productSize = await ProductSize.create(body);
            return res.status(200).send({ productSize: productSize });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update ProductSize
    update = async (req, res) => {
        const body = req.body;
        try {
            const productSize = await ProductSize.update(body, { where: { id: body.id } });

            return res.status(200).send({ productSize: productSize });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };
}

module.exports = new ProductSizeService();
