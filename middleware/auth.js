const config = require('config')
const jwt = require('jsonwebtoken')


module.exports = async function(req, res, next) {

    const token = req.header('x-user-token')
    if (!token) {
        res.status(401).send('Access Denied.No token Found')
        return
    }
    try {
        const decode = await jwt.verify(token, config.get('mcPrivateKey'))
        req.user = decode
        next()

    } catch (error) {
        res.send(400).send('Invalid token')
    }



}