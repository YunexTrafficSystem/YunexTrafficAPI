require ('dotenv').config()

const cors = require('cors');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
/////

//Puerto
app.listen(4000, ()=>console.log('Server started'))

//plantillas
app.set('view engine','ejs')
app.set('views','/index')

//conexión DB
mongoose.connect(process.env.DB_CONNECT)
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Db'))




app.use(express.json());


//rutas
app.use(cors());


app.use(express.static(__dirname + "/views"))
const registerRouter=require('./routes/register')
app.use('/SignUp',registerRouter) 

const incomelabRouter=require('./routes/incomeLab')
app.use('/IncomeLab',incomelabRouter) 

const incomeEnsRouter=require('./routes/incomeEns')
app.use('/IncomeEns',incomeEnsRouter) 

const reportEhsRouter=require('./routes/reportEhs')
app.use('/ReportEhs',reportEhsRouter) 


