const express = require('express');
const router = express.Router();
const CountryClinet = require('../../../db-client/country/country');
const FlatClient =require('../../../db-client/flat/flatDB')
const {ObjectId}=require('mongodb');

router.get('/:countryId/:flatoption',(req,res,next)=>{
    
    const {countryId}=req.params;
    const {flatoption} = req.params;
    cb=(flats)=>{
        res.json(flats);
    }
    FlatClient.findFlats({country:ObjectId(countryId),rentOrSale:flatoption},cb);

})

router.get('/:flatId',(req,res,next)=>{
    const {flatId} =req.params;
    cb = (flat)=>{
        res.json(flat)
    }
    FlatClient.singleFlat(flatId,cb);
});

module.exports =router;