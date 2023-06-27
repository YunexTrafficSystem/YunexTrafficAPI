const express = require('express')
const router = express.Router()
const rpEsh = require('../model/reporteEhs')

//Tomar todos los eventos
router.get('/all', async(req, res)=>{
    try {
        const report = await rpEsh.find()
        if(!report){
            res.status(400).json({mesage : "no se encontro nada"})
        }
        res.json(report)
        console.log(report)
    } catch (err) {
        res.status(400).json({message: err.message})
        console.log(err)
    }
})



//Crear evento
router.post('/',async(req,res)=>{
    const report = new rpEsh(req.body)
    try {
        const newReport = await report.save()
        res.status(201).json(newReport)
    } catch (err) {
        res.status(400).json({message: err.message})
        console.log(err)
    }
})

module.exports= router