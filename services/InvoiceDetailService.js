const { Op } = require("sequelize");
const { InvoiceDetail, Type } = require(__basedir + '/models');
class InvoiceDetailService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const invoice = await InvoiceDetail.findOne({ where: { id: id } });
            res.status(200).send({ invoice: invoice });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All InvoiceDetails
    getAll = async (req, res) => {
        const { page = 0, limit = 10, search = "" } = req.query;
        try {
            const invoices = await InvoiceDetail.findAndCountAll({
                offset: +(limit * page),
                limit: +limit,
                include:[
                  {
                      model: Type,
                  }],
            });
            return res.status(200).send({ invoices: invoices });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create InvoiceDetail
    create = async (req, res) => {
        const body = req.body;

        // Create InvoiceDetail
        try {
            const invoice = await InvoiceDetail.create(body);
            return res.status(200).send({ invoice: invoice });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update InvoiceDetail
    update = async (req, res) => {
        const body = req.body;
        try {
            const invoice = await InvoiceDetail.update(body, { where: { id: body.id } });

            return res.status(200).send({ invoice: invoice });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };
}

module.exports = new InvoiceDetailService();
