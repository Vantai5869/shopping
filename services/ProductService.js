const { Op } = require("sequelize");
const { Product, ProductSize,InvoiceDetail,Sizes } = require(__basedir + '/models');
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
        const { 
            page = 0, 
            limit = 10, 
            search = "", 
            typeId= null, 
            priceMin=0, 
            priceMax=99999999999999, 
            sizeId=null,
            sale=-1
        } = req.query;
        let condition={
            productName: { [Op.like]: `%${search}%` },
            productPrice:{[Op.and]: {
                [Op.gte]: priceMin,
                [Op.lte]: priceMax
            }},
            productPrice:{[Op.and]: {
                [Op.gte]: priceMin,
                [Op.lte]: priceMax
            }},
            discount:{
                [Op.gte]: sale,
            }
        }

        let conditionInclude=[
            {
                model: ProductSize,
                // where:conditionInclude
            },
        ]
        if(typeId!=null){
            condition={...condition, typeId:{
                [Op.in]: typeId.split(",")
            }}
        }
        if(sizeId!=null){
            const w= {
                where:{
                     sizeId:{
                    [Op.in]: sizeId.split(",")
                    } 
                }
            }
            conditionInclude={
                ...conditionInclude,
                ...w
            }
        }
        try {
            
            const products = await Product.findAndCountAll({
                distinct: true,
                order: [ [ 'createdAt', 'DESC' ]],
                where:condition,
                include:conditionInclude,
                offset:+(limit * page),
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
