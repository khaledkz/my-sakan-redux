const {ObjectId}=require('mongodb');
const Flat= require('../../models/Flat')
require('../connection')

const createFlat =(query,cb)=>{
    Flat.create(query).then(cb);
}

const findFlats=(query,cb)=>{
    Flat.find(query).then(cb)
}

const singleFlat=(flatId,cb)=>{
    Flat.findById(flatId).then(cb);
}

const deleteSingleFlat=(flat,cb)=>{
    Flat.remove({_id:ObjectId(flat)}).then(cb);
}

const updateSingleFlat=(flat,query,cb)=>{
    Flat.updateOne({_id:ObjectId(flat)},query).then(cb);
}

module.exports={createFlat,findFlats,singleFlat,deleteSingleFlat,updateSingleFlat};