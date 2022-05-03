/**
 * author: larry amiel tablando
 * link: github.com/larryamiel
 * description: exporting the router for the authentication routes.
 */

const router = require('express').Router();
const AuthService = require(__basedir + '/services/AuthService');

// Register Route
router.post('/register', AuthService.register);

// Login Route
router.post('/login', AuthService.login);
router.post('/forgot-password', AuthService.forgotPassword);
router.post('/update-password/:tokencheck', AuthService.updatePassword);
router.get('/list-user', AuthService.getUser);


router.post('/active', AuthService.activeUser);







// // Authenticated Route
// router.get('/authenticate', AuthService.authenticate);

// // Login Route
// router.post('/logout', AuthService.logout);

module.exports = router;