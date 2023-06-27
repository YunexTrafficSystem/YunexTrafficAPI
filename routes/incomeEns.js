const express = require('express')
const router = express.Router()
const IncomeEns = require('../model/incomeEns')

//Tomar todos los eventos
router.get('/all', async(req, res)=>{
    try {
        const incomens = await IncomeEns.find()
        res.json(incomens)
        console.log(incomens)
    } catch (err) {
        res.status(400).json({message: err.message})
        console.log(err)
    }
})

//Tomar evento individual
router.get('/:id',getIncomeEns,(req, res)=>{
    res.json(res.incomeEns)
})


//Crear evento
router.post('/',async(req,res)=>{
    const incomeEns = new IncomeEns(req.body)
    try {
        const newIncomeEns = await incomeEns.save()
        res.status(201).json(newIncomeEns)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


//Actualizar evento
router.put('/update/:id',async(req,res)=>{
    const incomeEnsId = req.params.id;
    try {

        const income = IncomeEns.findById(incomeEnsId);
        if(!income){
            return res.status(400).json({
                msg:"no existe evento con este id"
            })
        }
        const nuevoIncome = {...req.body}
        const actualiEns = await IncomeEns.findByIdAndUpdate(incomeEnsId,nuevoIncome, {new:true})

        res.status(200).json({
            evento: actualiEns
        })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//Eliminar evento
router.delete('/delete/:id',async(req, res)=>{
    const incomeEnsId = req.params.id
    let incomeEns
    try {
        incomeEns = await IncomeEns.findByIdAndDelete(incomeEnsId);
        res.json({incomeEns, message: 'Eliminado correctamente'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


async function getIncomeEns(req, res, next){
    const incomeEnsId = req.params.id
    let incomeEns
    try{
        incomeEns = await IncomeEns.findById(incomeEnsId)
        if(!incomeEns){
            return res.status(404).json({message: ' cannot find event'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.incomeEns = incomeEns
    next()
}
module.exports= router