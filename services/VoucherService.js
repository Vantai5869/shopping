const { Op } = require("sequelize");
const { Voucher } = require(__basedir + '/models');
class VoucherService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const voucher = await Voucher.findOne({ where: { id: id } });
            res.status(200).send({ voucher: voucher });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Vouchers
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const vouchers = await Voucher.findAndCountAll({
                where: {
                    voucherName: { [Op.like]: `%${search}%` },
                },
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ vouchers: vouchers });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create Voucher
    create = async (req, res) => {
        const body = req.body;

        // Create Voucher
        try {
            const voucher = await Voucher.create(body);
            return res.status(200).send({ voucher: voucher });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Voucher
    update = async (req, res) => {
        const body = req.body;
        try {
            const voucher = await Voucher.update(body, { where: { id: body.id } });

            return res.status(200).send({ voucher: voucher });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await Voucher.destroy({
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

module.exports = new VoucherService();
