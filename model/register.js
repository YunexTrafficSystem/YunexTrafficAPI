const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name:{ type:String, required: true},
    rol:{ type:String, required: true},
    email:{ type:String, required: true, unique:true},
    password:{ type:String, required: true},
    numberCC:{ type:Number,required:true},
    expeditionDate:{ type:String,required:true},
    cellPhoneNumber:{type:Number,required:true},
    bornDate:{type:String,required:true},
})

module.exports = mongoose.model('Register',registerSchema);