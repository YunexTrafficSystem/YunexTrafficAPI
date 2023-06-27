const express = require('express')
const router = express.Router()
const IncomeLab = require('../model/incomeLab')

//Tomar todos los eventos
router.get('/all', async(req, res)=>{
    try {
        const incomelab = await IncomeLab.find()
        if(!incomelab){
            res.status(400).json({mesage : "no se encontro nada"})
        }
        res.json(incomelab)
        console.log(incomelab)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Tomar evento individual
router.post('/one',getIncomeLab,async(req, res)=>{
    const {ticket} = req.body
    try{
        const incomelab = await IncomeLab.find({ticket})
        res.status(200).json({incomelab, "ingreso por: ": IncomeLab.actividadARealizar})
    }catch(err){
        res.status(400).json({message: err.message})
    }
    
})


//Crear evento
router.post('/',async(req,res)=>{
    const incomeLab = new IncomeLab(req.body)
    try {
        const newIncomeLab = await incomeLab.save()
        res.status(201).json(newIncomeLab)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


//Actualizar evento
router.put('/update/:id',async(req,res)=>{

    const incomelabId = req.params.id;
    try {



        const income = IncomeLab.findById(incomelabId);
        if(!income){
            return res.status(400).json({
                msg:"no existe evento con este id"
            })
        }
        const nuevoIncome = req.body
        const actualiLab = await IncomeLab.findByIdAndUpdate(incomelabId,nuevoIncome)

        res.status(200).json({
            evento: actualiLab
        })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//Eliminar evento
router.delete('/delete/:id',async(req, res)=>{
    const incomeLabId = req.params.id
    let incomeLab
    try {
        incomeLab = await IncomeLab.findByIdAndDelete(incomeLabId);
        res.status(200).json({incomeLab, message: 'Eliminado correctamente'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


async function getIncomeLab(req, res, next){

    let incomeLab = req.params.id
    try{
        incomeLab = await IncomeLab.findById(incomeLab)
        if(!incomeLab){
            return res.status(404).json({message: ' cannot find event'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.incomeLab = incomeLab
    next()
}
module.exports= router