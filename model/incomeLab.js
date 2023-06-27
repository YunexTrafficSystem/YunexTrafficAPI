const mongoose = require('mongoose');

const incomeLabSchema = new mongoose.Schema({
    ticket:{ type:String},
    fechaDeIngreso:{ type :String},
    modulo:{ type:String},
    equipo:{ type:String},
    serial:{ type:String},
    cantidad:{ type:String},
    actividadARealizar:{type:String},
    ciudad:{type:String,required:true},
    observaciones:{ type:String},
    contratoNo:{ type:String},
    cliente:  { type:String},
    nombreRemitente:{ type:String},
    ingresaPorGarantiaDelServicio:{ type:String},
    fechaEsperadaDeSalida:{ type :String},
    responsableCentroDeReparaciones:{ type:String},
    responsableServicios:{type:String},
    fechaRealDeEntrega:{type:String},
    cumplimientofechaEntrega:{ type:String},
    tiempoEstimadoDeReparacion:{type:String},
    tiempoRealActividad:{type:String},
    cumplimientoTiempoDeReparacion:{ type:String},
    año:{ type:String }
})

module.exports = mongoose.model('IncomeLab',incomeLabSchema);