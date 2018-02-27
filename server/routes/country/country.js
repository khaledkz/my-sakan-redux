var express = require('express');
var router = express.Router();
const countryClient=require('../../db-client/country/country');

router.get('/add',(req,res,next)=>{
    res.render('add-country')
});

router.get('/edit',(req,res,next)=>{
    
    cb=(countries)=>{
        console.log(countries[0].order)
        res.render('edit-country',{
            countries
        })
    }

    countryClient.findCounrty({},cb)
});

router.post('/add',(req,res,next)=>{
    
    cb=()=>{
        res.redirect('/');
    }
    
    countryClient.addCountry(req.body,cb);
})

router.get('/edit/:countryID',(req,res,next)=>{

    const {countryID}=req.params;
    
    const  cb=(singleCountry)=>{
        res.render('single-country',{
            singleCountry
        })
    }

    countryClient.findSingleCountry(countryID,cb);
 })

 router.get('/edit/:countryID/delete',(req,res,next)=>{
    
    const {countryID}=req.params;
    const cb=()=>{
            res.redirect('/country/edit')
    }
    countryClient.deleteSingleCountry(countryID,cb);
});
/** 
router.get('/edit/:countryID/update',(req,res,next)=>{
    
    const {countryID}=req.params;
    const cb=()=>{
            res.redirect('/country/edit')
    }
    countryClient.updateSingleCountry(countryID,cb);
});
*/

router.get('/edit/:countryID/update',(req,res,next)=>{
    const {countryID}=req.params;

    const  cb=(singleCountry)=>{
        res.render('edit-single-country',{
            singleCountry
        })
    }

    countryClient.findSingleCountry(countryID,cb);
});

router.get('/edit/:countryID/update',(req,res,next)=>{
    
    const {countryID}=req.params;
    const  cb=(singleCountry)=>{
        res.render('edit-single-country',{
            singleCountry
        })
    }

    countryClient.findSingleCountry(countryID,cb);
});
 

router.post('/edit/:countryID/update',(req,res,next)=>{
    console.log(req.body)
    const {countryID}=req.params;

    const cb=()=>{
            res.redirect('/country/edit')
    }

    countryClient.updateSingleCountry(countryID,req.body,cb);
});


module.exports=router;