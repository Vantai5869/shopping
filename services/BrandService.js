const { Brand } = require(__basedir + '/models');

class UserService {

  get = async (req, res) => {
    if (! req.user) res.sendStatus(403);
    const { id } = req.params;
    try {  
      const brand = await Brand.findOne({ where: { id: id } });
      res.status(200).send({ brand: brand });
    }
    catch (err) {
      if (err) res.status(403).send({ error: err });
    }
  }

  // Get All Brands
  getAll = async (req, res) => {
    if (! req.user) res.sendStatus(403);
    const { page, limit, search} = req.query;
    try {
      const brands = await Brand.findAndCountAll({
        where: {
          username: { [Op.like]: `%${search}%` },
        },
        offset: +(limit * page),
        limit: +limit,
      });

      res.status(200).send({ brands: brands });
    }
    catch (err) {
      console.log(err);
      // Send Error
      if (err) res.sendStatus(403);
    }
  }

  // Create Brand
  create = async (req, res) => {
    if (! req.user) res.sendStatus(403);
    const body = req.body;

    // Create Brand
    try {  
      const brand = await Brand.create(body);
      res.status(200).send({ brand: brand });
    }
    catch (err) {
      // Send Error
      if (err) res.status(403).send({ error: err });
    }
  }

  // Update Brand
  update = async (req, res) => {
    if (! req.user) res.sendStatus(403);
    const body = req.body;
    try {  
      const brand = await Brand.findOne({
        where: { id: body.id }
      });

      // Update Using Key
      brand[body.key] = body.value;
      // Save Update
      await brand.save();

      res.status(200).send({ brand: brand });
    }
    catch (err) {
      // Send Error
      if (err) res.status(403).send({ error: error });
    }
  }
}
 
module.exports = new UserService();