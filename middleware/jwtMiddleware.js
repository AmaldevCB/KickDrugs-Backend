const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log('inside jwt');

    const token = req.cookies?.adminToken
    console.log(token);
    if(!token){
        return res.status(401).json('No token found in cookies')
    }
    try {
        const jwtResponse = jwt.verify(token,process.env.JWT_KEY)
        console.log(jwtResponse);
        req.payload = jwtResponse.admin
        next()

    } catch (error) {
        res.status(401).json(error)
    }
}

module.exports = jwtMiddleware