const rateLimit = require('express-rate-limit');

function limiter(limit,time){
    return rateLimit({
        windowMs: time * 60 * 1000, // 15 minutes
        max: limit, // Limit each IP to 'limit' requests per windowMs
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message :{
            status : 429,
            message : `Too many requests, please try again after ${time} minutes.`
        }
    });
};


module.exports = limiter;