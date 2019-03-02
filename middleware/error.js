const winston = require('winston');

module.exports = function(err, req, res, next) {


    winston.error(err.message, err)
        //log the exception here
    res.status(500).send(`Operation Failed with error message: ${err}`)

}