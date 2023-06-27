const mongoose = require('mongoose');

const incomeEnsSchema = new mongoose.Schema({
    consecutivo:{ type:String},
    fechaInicio:{ type :String},
    grafo:{ type:String},
    semaforo:{ type:String},
    bandejas:{ type:String},
    controlador:{ type:String},
    sxProteccion:{type:String},
    cantidad:{type:String},
    sinIniciar:{ type:String},
    enCurso:{ type:String},
    finalizado:{ type:String},
    contrato:{ type:String},
    cliente:{ type:String},
    nombreRemitente:{ type :String},
    fechaEstimadaFinalizacion:{ type:String},
    fechaRealEntrega:{type:String},
    cumplimientoFechaEntrega:{type:String},
    recibido:{type:String},
    responsableEnsamble:{type:String},
    responsableServicio:{type:String}
})

module.exports = mongoose.model('IncomeEns',incomeEnsSchema);