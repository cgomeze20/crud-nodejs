
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()


const uri = `${process.env.DATABASE_CNN}`;


mongoose.connect(uri,
    {useNewUrlParser: true, 
     useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    })
    .then(()=>console.log('Conectado'))
    .catch(e => console.log('No se pudo conectar'))


//Importansdo rutas
const indexRouter = require('./routes/index')


//Setting
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname , 'views'))
app.set('view engine','ejs')

//Statics files
app.use(express.static(path.join(__dirname,'public')))

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));

//Rutas
app.use('/',indexRouter)

app.listen(app.get('port'),()=>{
    console.log(`server corriendo port ${app.get('port')} `);
})