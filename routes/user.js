/**
 * author: larry amiel tablando
 * link: github.com/larryamiel
 * description: exporting the router for the user routes.
 */

const router = require('express').Router();
const UserService = require(__basedir + '/services/UserService');

const { authenticate } = require(__basedir + '/middlewares/AuthMiddleware');

// Get User
router.get('/', authenticate, UserService.get);

module.exports = router;