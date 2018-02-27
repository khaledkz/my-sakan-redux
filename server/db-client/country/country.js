const ObjectId = require('mongodb').ObjectID;

const Country =require('../../models/Country');
require('../connection')

const addCountry =(query,cb)=>{
    Country.create(query).then(cb);
};

const findCounrty=(query,cb)=>{
    Country.find(query).then(cb);
}

const findSingleCountry=(country,cb)=>{
    // Country.findById({'id':ObjectId(country)}).then(cb);
    Country.findById(country).then(cb);

}

const deleteSingleCountry=(country,cb)=>{
    Country.remove({_id:ObjectId(country)}).then(cb);   
}

const updateSingleCountry=(country,query,cb)=>{
    Country.updateOne({_id:ObjectId(country)},query,{upsert:true}).then(cb);
}

module.exports={addCountry,findCounrty,findSingleCountry,deleteSingleCountry,updateSingleCountry};