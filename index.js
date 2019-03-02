const error = require('./middleware/error')
const config = require('config')
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi)
const product = require('./routes/product');
const category = require('./routes/category')
const bodyparser = require('body-parser');

const express = require('express')
const app = express()


const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const con = config.get('PrivateKey')
if (!con) {
    console.error('FATAL ERROR: fatal error no config set')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true })
    .then(() => { console.log('db connected') })
    .catch(err => { console.log(err) })

app.use(express.json())
app.use(express.urlencoded())



app.use('/api/product', product);
app.use('/api/category', category)


//error fuction that takes 3 parameters req, res, err
app.use(error)

const port = process.env.PORT || 8081

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})