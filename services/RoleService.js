/**
 * Service - Test Service
 * A Service Helper that handles the Tests
 */

const { Role } = require(__basedir + '/models');

class RoleService {

  // Create Role
  create = async (req, res) => {
    if (! req.user){
      return res.sendStatus(403);
    } 

    // Get Request Body
    const body = req.body;

    // Build Role
    const args = {
      title: body.title
    }

    // Create Role
    try {  
      const role = await Role.create(args);

      res.status(200).send({ role: role });
    }
    catch (err) {
      // Send Error
      if (err) res.status(403).send({ error: err });
    }
  }

  // Update Role
  update = async (req, res) => {
    if (! req.user){
      return res.sendStatus(403);
    } 

    // Get Request Body
    const body = req.body;

    try {  
      await Role.update(
        { title: body.title },
        { where: { role_id: body.role_id } }
      )

      return res.status(200).send({ sucess: true });
    }
    catch (err) {
      // Send Error
      if (err) res.status(403).send({ error: err });
    }
  } 
  
  // Delete Role
  delete = async (req, res) => {
    // if (! req.user){
    //   return res.sendStatus(403);
    // } 

    // Get Request Params
    const params = req.params;
    try {  
        await Role.destroy({
        where:{ role_id: params.role_id }
      })
      
      return res.status(200).send({ sucess: true });
    }
    catch (err) {
      // Send Error
      if (err) res.status(403).send({ error: error });
    }
  }
}
 
module.exports = new RoleService();