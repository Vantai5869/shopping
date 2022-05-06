const { Op } = require("sequelize");
const { Brand, Type } = require(__basedir + '/models');
class BrandService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const brand = await Brand.findOne({ where: { id: id } });
            res.status(200).send({ brand: brand });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Brands
    getAll = async (req, res) => {
        const { page = 0, limit = 100, search = "" } = req.query;
        try {
            const brands = await Brand.findAndCountAll({
                distinct: true,
                where: {
                    brandName: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
                include:[
                  {
                      model: Type,
                  }],
            });
            return res.status(200).send({ brands: brands });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create Brand
    create = async (req, res) => {
        const body = req.body;

        // Create Brand
        try {
            const brand = await Brand.create(body);
            return res.status(200).send({ brand: brand });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Brand
    update = async (req, res) => {
        const body = req.body;
        try {
            const brand = await Brand.update(body, { where: { id: body.id } });

            return res.status(200).send({ brand: brand });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        console.log(body)
        try {
            const result = await Brand.destroy({
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

module.exports = new BrandService();
