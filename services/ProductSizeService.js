const { Op } = require("sequelize");
const { ProductSize, Sizes } = require(__basedir + '/models');
class ProductSizeService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const productSize = await ProductSize.findAndCountAll({
                
                 where: { productId: id } ,
                 attributes:[],
                 include:[
                     {
                         model: Sizes,
                         attributes: ["sizeNumber"]
                     }
                 ],
                 raw: true,
                 nest: true,
            });
            // const size= productSize.rows;
            // console.log(size)
            const sizes= productSize?.rows?.map(item=>item?.Size?.sizeNumber);
            res.status(200).send({ sizes: sizes });
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

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await ProductSize.destroy({
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

module.exports = new ProductSizeService();
