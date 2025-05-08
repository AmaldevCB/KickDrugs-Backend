require('dotenv').config()

const express = require('express')

const cors = require('cors')

const router = require('./router')

const server=express()

server.use(cors())

server.use(express.json({limit:'5mb'}))

server.use(router)

require('./connection')

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})
