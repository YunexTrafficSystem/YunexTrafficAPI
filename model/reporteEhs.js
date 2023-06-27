const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    tipoEvento:{ type:String, required: true},
    fname:{ type:String},
    areaEvento:{ type:String, required: true, unique:true},
    descripcionEvento:{ type:String, required: true},
    accionCorrectivaPropuesta:{ type:String,required:true},
    responsableAccionCorrectivaPropuesta:{ type:String,required:true},
    quienRecibeElReporte:{type:String,required:true},
    actosInseguros:{type:String,required:true},
    condicionesInseguras:{type:String,required:true},
})

module.exports = mongoose.model('rpEsh',reportSchema);