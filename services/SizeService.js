const { Size } = require(__basedir + '/models');
class SizeService {
    get = async (req, res) => {
        const { id } = req.params;
        try {
            const size = await Size.findOne({ where: { id: id } });
            res.status(200).send({ size: size });
        } catch (err) {
            if (err) res.status(403).send({ error: err });
        }
    };

    // Get All Sizes
    getAll = async (req, res) => {
        const { page = 0, limit = 10 } = req.query;
        try {
            const sizes = await Size.findAndCountAll({
                offset: +(limit * page),
                limit: +limit,
            });
            return res.status(200).send({ sizes: sizes });
        } catch (err) {
            console.log(err);
            // Send Error
            if (err) res.sendStatus(403);
        }
    };

    // Create Size
    create = async (req, res) => {
        const body = req.body;

        // Create Size
        try {
            const size = await Size.create(body);
            return res.status(200).send({ size: size });
        } catch (err) {
            // Send Error
            if (err) return res.status(403).send({ error: err });
        }
    };

    // Update Size
    update = async (req, res) => {
        const body = req.body;
        try {
            const size = await Size.update(body, { where: { id: body.id } });

            return res.status(200).send({ size: size });
        } catch (err) {
            // Send Error
            return res.status(403).send({ error: err });
        }
    };

    // Delete 
    delete = async (req, res) => {
        const body = req.params;
        try {
            const result = await Size.destroy({
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

module.exports = new SizeService();
