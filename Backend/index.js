const express = require('express')
const {connectMongoDb} = require('./connection')
const app = express();
const PORT = 8000
const URL = require('./models/url')
const urlRoute = require('./Routes/url')

//MongoDb Connection
connectMongoDb('mongodb://127.0.0.1:27017/LinkShrink').then(()=>{
    console.log("MongoDb connected!!")
})

//Middleware

app.use(express.json())

//Routes
app.use('/url',urlRoute)




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})

