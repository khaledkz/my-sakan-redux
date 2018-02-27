const express = require('express');
const router = express.Router();
const CountryClinet = require('../../../db-client/country/country');

router.get('/all',(req,res,next)=>{ 

    cb=(countries)=>{
        res.json(countries);
    }
    CountryClinet.findCounrty({},cb);
});

module.exports=router;