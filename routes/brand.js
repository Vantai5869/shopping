 const router = require('express').Router();
 const BrandService = require('../services/BrandService');
 
 
 router.get('/all', BrandService.getAll);
 
 router.get('/:uuid', BrandService.get);
 
 router.post('/create', BrandService.create);
 
 router.post('/update', BrandService.update);
 
 module.exports = router;