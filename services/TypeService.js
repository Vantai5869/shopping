const { Op } = require("sequelize");
const db = require("../models");
const { Type, Product, Brand} = require(__basedir + '/models');
class TypeService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const type = await Type.findOne({ where: { id: id } });
            res.status(200).send({ type: type });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Types
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "", brandId=null } = req.query;
        let condition={};
        if(brandId!=null){
            condition={...condition, brandId}
        }
        try {
            const types = await Type.findAndCountAll({
                distinct: true,
                where: {
                    typeName: { [Op.like]: `%${search}%` },
                    ...condition
                },
                offset: +(limit * page),
                limit: +limit,
                include:[
                    {
                        model: Product
                    }
                ]
            });
            return res.status(200).send({ types: types });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Get All Types
    getBrand = async (req, res) => {
        const typeId = req.params.id
        try {
            const types = await Type.findOne({
                where: {
                    id: typeId
                },
                include:[
                    {
                        model: Brand
                    }
                ]
            });
            return res.status(200).send({ types: types });
        } catch (err) {
            console.log(err);
            if (err) res.sendStatus(403);
        }
    };

    // Create Type
    create = async (req, res) => {
        const body = req.body;

        // Create Type
        try {
            const type = await Type.create(body);
            return res.status(200).send({ type: type });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Type
    update = async (req, res) => {
        const body = req.body;
        try {
            const type = await Type.update(body, { where: { id: body.id } });

            return res.status(200).send({ type: type });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };


    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await Type.destroy({
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

module.exports = new TypeService();
