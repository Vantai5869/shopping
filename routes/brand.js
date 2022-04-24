 const router = require('express').Router();
 const BrandService = require('../services/BrandService');
 
 const mid = (req, res, next)=>{
  req.user={name:'xxxx'},
  next();
 }
 
 router.get('/all',mid, BrandService.getAll);
 
 router.get('/:uuid',mid, BrandService.get);
 
 router.post('/create',mid, BrandService.create);
 
 router.post('/update',mid, BrandService.update);
 
 module.exports = router;