const { Op } = require("sequelize");
const { Product } = require(__basedir + '/models');
class ProductService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findOne({ where: { id: id } });
            res.status(200).send({ product: product });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Products
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const products = await Product.findAndCountAll({
                where: {
                    productName: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ products: products });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create Product
    create = async (req, res) => {
        const body = req.body;

        // Create Product
        try {
            const product = await Product.create(body);
            return res.status(200).send({ product: product });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Product
    update = async (req, res) => {
        const body = req.body;
        try {
            const product = await Product.update(body, { where: { id: body.id } });

            return res.status(200).send({ product: product });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete Product
    delete = async (req, res) => {
        const body = req.params;
        try {
            const product = await Product.destroy({
                where: {
                    id:body.id
                }
            })
            return res.status(200).send({ product: product });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };
}

module.exports = new ProductService();
