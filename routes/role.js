/**
 * author: larry amiel tablando
 * link: github.com/larryamiel
 * description: exporting the router for the user routes.
 */

const router = require('express').Router();
const RoleService = require(__basedir + '/services/RoleService');

const { roleMiddleware } = require(__basedir + '/middlewares/RoleMiddleware');

// Create Role
router.post('/create',roleMiddleware, RoleService.create);
router.post('/update',roleMiddleware,  RoleService.update);
router.delete('/delete/:role_id',roleMiddleware, RoleService.delete);

module.exports = router;