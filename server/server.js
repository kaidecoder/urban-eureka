import express from 'express'
const app = express()

import devBundle from './devBundle'
devBundle.compile(app)

import path from 'path'
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

import template from './../template'
app.get('/', (req, res) => {
    res.status(200).send(template())
})

const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-simplesetup'
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    console.log("Connected successfully to mongodb server")
    db.close()
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
    if(err) {
        console.log(err)
    }
    console.info('Express server started on port %s.', port)
})