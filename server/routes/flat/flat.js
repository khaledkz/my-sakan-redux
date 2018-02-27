var express = require('express');
var router = express.Router();
const flatDB = require('../../db-client/flat/flatDB');
const countryClient = require('../../db-client/country/country');
const {ObjectId}=require('mongodb');

router.get('/add', function (req, res, next) {

      cb = (countries) => {
            console.log(countries[0].order);
            res.render('flat-add', {
                  countries
            })
      }

      countryClient.findCounrty({}, cb);

})

router.get('/edit', function (req, res, next) {
      res.render('flat-edit-list')
})

router.get('/edit/all', function (req, res, next) {
      const cb = (flats) => {

            res.render('edit-flat-all', {
                  flats
            })

      }

      flatDB.findFlats({}, cb)
})

router.get('/edit/id',(req,res,next)=>{
      res.render('edit-option-id');
});
 
router.post('/edit/id',(req,res,next)=>{
      const query = req.body;  
 
      cb=(flat)=>{
            res.render('single-flat-list-all',{flat})
      }

      flatDB.singleFlat(query,cb);

})

router.get('/edit/all/:flatId', function (req, res, next) {

      const { flatId } = req.params;

      const cb = (flat) => {
            res.render('single-flat-list-all', {
                  flat
            });
      }

      flatDB.singleFlat(flatId, cb)
})

router.get('/edit/all/:flatId/delete', (req, res, next) => {

      const { flatId } = req.params;

      const cb = () => {
            res.redirect('/');
      }

      flatDB.deleteSingleFlat(flatId, cb);
});

router.get('/edit/all/:flatId/update', (req, res, next) => {
      const { flatId } = req.params;

      cb1 = (countries) => {

            const cb2 = (flat) => {
                  let countrySelected = {};
                  //console.log(flat.country)

                  countries.map((country) => {
                        //console.log(country._id);
                        countryId = (country._id).toString();
                        flatCountry = (flat.country).toString();


                        if (countryId === flatCountry) {
                              countrySelected = country;
                        }
                  })
                  console.log(flat)
                  res.render('single-flat-update', {
                        flat,
                        countries,
                        countrySelected
                  });
            }

            flatDB.singleFlat(flatId, cb2)
      }

      countryClient.findCounrty({}, cb1)

});

router.post('/edit/all/:flatId/update', (req, res, next) => {

      const { flatId } = req.params;

      let query = req.body;


      let newQuery = {

            country: query.country,
            rentOrSale: query.rentOrSale,
            briefDescription:query.briefDescription,
            description: {
                  order: query.order,
                  address: {
                        city: query.city,
                        postCode: query.postCode,
                        street: query.street,
                        flatNumber: query.flatNumber,
                  },
                  title: query.title,
                  lettingInformation: {
                        price: query.price,
                        dataAvailable: query.dataAvailable,
                        furnishing: query.furnishing,
                        lettingType: query.lettingType,
                        reducedOnWebsite: query.reducedOnWebsite,
                        deposit: query.deposit
                  },
                  fullDescription: query.fullDescription
            }
      };

      const cb = () => {
            res.redirect('/');
      }

      flatDB.updateSingleFlat(flatId, newQuery, cb);
});


router.post('/add', (req, res, next) => {
      let query = req.body;


      let newQuery = {

            country: query.country,
            rentOrSale: query.rentOrSale,
            briefDescription:query.briefDescription,
            description: {
                  order: query.order,
                  address: {
                        city: query.city,
                        postCode: query.postCode,
                        street: query.street,
                        flatNumber: query.flatNumber,
                  },
                  title: query.title,
                  lettingInformation: {
                        price: query.price,
                        dataAvailable: query.dataAvailable,
                        furnishing: query.furnishing,
                        lettingType: query.lettingType,
                        reducedOnWebsite: query.reducedOnWebsite,
                        deposit: query.deposit
                  },
                  fullDescription: query.fullDescription
            }
      };

      const cb = () => {
            res.redirect('/')
      }

      flatDB.createFlat(newQuery, cb)
})

router.get('/edit/to-rent', (req, res, next) => {
      res.render('flat-search-options', { page: 'to-rent' })
});

router.get('/edit/for-sale', (req, res, next) => {
      res.render('flat-search-options', { page: 'for-sale' })
});

router.get('/edit/for-sale/country', (req, res, next) => {

      const cb=(countries)=>{
            res.render('list-torent-forsale-countries',{
                  countries
            });
      }

      countryClient.findCounrty({}, cb);

})

router.get('/edit/for-sale/company', (req, res, next) => {
      res.render('search-company');
})

router.get('/edit/for-sale/city', (req, res, next) => {
      res.render('search-city');
});

router.get('/edit/for-sale/all', (req, res, next) => {
      
      cb = (flats) => {
            res.render('list-torent-forsale-all-flat', { flats });
      }

      flatDB.findFlats({ 'rentOrSale': 'sale' }, cb);

});

router.get('/edit/for-sale/country/:countryId', (req, res, next) => {
      const {countryId}= req.params;

      cb=(flats)=>{
            res.render('list-torent-forsale-all-flat', { flats });
      }
       flatDB.findFlats({country:ObjectId(countryId),rentOrSale:'sale'},cb)

})

router.get('/edit/for-sale/country/:countryId/:flatId', (req, res, next) => {
    
      const {countryId}=req.params;
      const {flatId}=req.params;
    
      const cb=(flat)=>{
            res.render('single-flat-list-all',{flat})
      }

      flatDB.singleFlat(flatId,cb);
})

router.get('/edit/to-rent/all', (req, res, next) => {

      cb = (flats) => {
            res.render('list-torent-forsale-all-flat', { flats });
      }

      flatDB.findFlats({ 'rentOrSale': 'rent' }, cb);

});

router.get('/edit/for-sale/flatrefnumber', (req, res, next) => {
      res.render('search-flatrefnumber');
});


router.get('/edit/to-rent/country', (req, res, next) => {
      const cb=(countries)=>{
            res.render('list-torent-forsale-countries',{
                  countries
            });
      }

      countryClient.findCounrty({}, cb);
});
 
router.get('/edit/to-rent/country/:countryId/:flatId', (req, res, next) => {
    
      const {countryId}=req.params;
      const {flatId}=req.params;
    
      const cb=(flat)=>{
            res.render('single-flat-list-all',{flat})
      }

      flatDB.singleFlat(flatId,cb);
})

router.get('/edit/to-rent/country/:countryId', (req, res, next) => {
      const {countryId}= req.params;

      cb=(flats)=>{
            res.render('list-torent-forsale-all-flat', { flats });
      }
       flatDB.findFlats({country:ObjectId(countryId),rentOrSale:'rent'},cb)   
})

router.get('/edit/to-rent/company', (req, res, next) => {
      res.render('search-company');
})

router.get('/edit/to-rent/city', (req, res, next) => {
      res.render('search-city');
})

router.get('/edit/to-rent/flatrefnumber', (req, res, next) => {
      res.render('search-flatrefnumber');
})

module.exports = router;