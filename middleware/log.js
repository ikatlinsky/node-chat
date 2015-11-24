module.exports.log = function(req, res, next) {
    "use strict";

    console.log(req.url);
    next();
};