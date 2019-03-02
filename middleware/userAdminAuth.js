const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {

    const token = req.header('x-user-token')
    if (!token) return res.status(403).send('ACCESS DENIED')
    try {
        const decode = jwt.verify(token, config.get('mcPrivateKey'));
        req.user = decode;
        if (req.user.isAdmin && req.user.role[2].superUser) {
            next()
        }


    } catch (error) {
        res.status(401).send(`${error}'UNAUTHORISED ACCESS`)
    }



}