const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router()
const Register = require('../model/register')
const {generarJWT} = require('../helper/jwt')
const nodemailer = require('nodemailer')
//GET ALL
router.get('/all',async (req, res)=>{
    try {
        const registers = await Register.find()
        console.log(registers,"\n")
        res.json(registers)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: err.message})
        
    }
})

//GET ONE
router.get('/:id', getRegister, (req, res)=>{
    console.log(res.register,"\n")
    res.json(res.register)
})


//Creating one
router.post('/new',async (req,res)=>{
    const {email, password} = req.body
    try {
        let register = await Register.findOne({email : email});
        if(register){
            console.log("Ya existe un usuario con este correo","\n")
            return res.status(400).json({message: "ya existe un usuario con ese correo"})
        }
        register = new Register(req.body)
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        register.password = bcrypt.hashSync(password, salt);
        const newRegister = await register.save()

        //generar nuestro JW
        const token = await generarJWT( register._id, register.name);
        res.status(201).json({
            user: newRegister,
            token
        })
        console.log("Usuario: ",newRegister,"Token: ",token,"\n")
    } catch (err) {
        console.log(err)
        res.status(400).json({status: err.message})
    }
})

//recuperar contraseña
router.post('/forgotPassword',async(req, res)=>{

    const {email} = req.body;


    try {
        let register = await Register.findOne({email});
        if(!register){
            console.log("el usuario no existe registrese","\n")
            return res.status(400).json({ status: "Correo no registrado. Registrese" })
        }
        
        const secret = process.env.SECRET_JWT_SEED + register.password
        const token = jwt.sign({email: register.email, id: register._id},secret,{expiresIn:"4m",});
        const link = `http://localhost:4000/SignUp/reset-password/${register._id}/${token}`;
        const config = {
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "yunextrafficsystem@gmail.com",
                pass: "evxyqfooufrqfmdy"
            }
        }
        const mensaje ={
            from: "yunextrafficsystem@gmail.com",
            to: email,
            subject:"Recuperacion de contraseña",
            text: "El link expira en 4 minutos:  "+link,
        }
        const transport = nodemailer.createTransport(config)
        const info = await transport.sendMail(mensaje)
        
        res.status(200).json({link: link, info: info})
        console.log("link para recuperar contraseña: ",link,"\n", info,"\n")
        enviarMail();
    } catch (error) {
        res.status(400).json({ status: error.message })
    }
})



router.get('/reset-password/:id/:token',async(req,res)=>{
    const {id, token}=req.params;
    
    res.status(200).json(req.params)
    console.log(req.params)
    const register = await Register.findOne({ _id: id});
    if(!register){
        console.log("el usuario no existe registrese","\n")
        return res.status(400).json({
            status: "registrese"
        })
    }
    const secret = process.env.SECRET_JWT_SEED + register.password
    try {
        const verify = jwt.verify(token,secret)
        res.render('index')
        console.log("verified")
    } catch (error) {
        console.log("no existe el usuario")
    }
    console.log("done")

})
  
// router.post('/reset-password/:id/:token',async(req,res)=>{
//     const {id, token}=req.params;
    
//     res.status(200).json(req.params)
//     console.log(req.params)
//     const register = await Register.findOne({ _id: id});
//     if(!register){
//         console.log("el usuario no existe registrese","\n")
//         return res.status(400).json({
//             status: "registrese"
//         })
//     }
//     const secret = process.env.SECRET_JWT_SEED + register.password
//     try {
//         const verify = jwt.verify(token,secret)
//         console.log("verified")
//         // res.render('../views/index.ejs',{email: verify.email,status:"not verified"})
//         console.log("verificado")
//     } catch (error) {
//         console.log("no existe el usuario")
//     }
//         console.log("done")

// })

//login 
router.post('/',async (req,res = response)=>{
    const {email, password} = req.body;
    try {
        let register = await Register.findOne({email});
        if(!register){
            console.log("error en el cooreo","\n")
            return res.status(400).json({ message: "error en Contraseña/Correo" })
        }
        const validPassword = bcrypt.compareSync(password, register.password);
        if(!validPassword){
            console.log("error en la contraseña","\n")
            return res.status(400).json({message: "error en Contraseña/Correo"})
        }
        const token = await generarJWT( register._id, register.name);

        res.status(201).json({
            login: register,
            token: token,
            password
        })

        console.log("login: ",register,"token: ",token,"\n")
    } catch (error) {
        res.status(400).json({ message: err.message })
        console.log(error,"\n")
    }
})

//Updating
router.put('/update/:id',getRegister,async (req, res)=>{
    if (req.body.name != null) {
        res.register.name = req.body.name
      }
    if (req.body.rol != null) {
        res.register.rol = req.body.rol
    }
    if (req.body.email != null) {
        res.register.email = req.body.email
    }
    if (req.body.password != null) {
        res.register.password = req.body.password
    }
    if (req.body.numberCC != null) {
        res.register.numberCC = req.body.numberCC
    }
    if (req.body.expeditionDate != null) {
        res.register.expeditionDate = req.body.expeditionDate
    }
    if (req.body.cellPhoneNumber != null) {
        res.register.cellPhoneNumber = req.body.cellPhoneNumber
    }
    if (req.body.bornDate != null) {
        res.register.bornDate = req.body.bornDate
    }
    try {
        const updatedRegister = await res.register.save()
        console.log(updatedRegister,"\n")
        res.json(updatedRegister)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// detele

router.delete('/delete/:id', async (req, res)=>{
    const registerId = req.params.id
    let register
    try {
        register = await Register.findByIdAndDelete(registerId)
        res.json({message: 'usuario eliminado', register})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getRegister(req, res, next){
    const registerId = req.params.id
    let register
    try{
        register = await Register.findById(registerId)
        if(!register){
            return res.status(404).json({message: ' cannot find user'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.register = register
    next()
}

module.exports= router