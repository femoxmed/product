const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    //check to see if cstoemr logged in as a token
    const token = req.header('x-cusAuthToken')
    if (!token) return res.status(404).send('Access Denied')

    try {
        const decode = jwt.verify(token, config.get('mcPrivateKey'))
        req.user = decode
        next()
    } catch (error) {
        res.status(401).send('Invalid Token, UnAuthorised Access')
    }




}