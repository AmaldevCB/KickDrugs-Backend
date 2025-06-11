require('dotenv').config()

const express = require('express')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const router = require('./router')

const server=express()

server.use(cors({
    origin: 'https://kick-drugs.vercel.app',
    credentials: true
}))
server.use(express.json({limit:'10mb'}))

server.use(cookieParser())

server.use(router)

require('./connection')

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})
