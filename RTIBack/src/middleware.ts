import * as fs from "fs"
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const RSA_PUBLIC_KEY = fs.readFileSync('src/assets/keys/public.key');

export var list = {
    checkIfLoggedIn: function(request, response, next) {
        if (expressJwt({
            secret: RSA_PUBLIC_KEY,
            algorithms: ['RS256']
        })) {
            return next();
        } else {
            response.status(400).json({
                status: 5,
                msg: "You are not logged in."
            });
        }
    },
    checkIfAdmin: function(request, response, next) {
        const user = JSON.parse(jwt.decode(request.headers.authorization.substr(7)).sub);
        if (user.type === "admin") {
            return next();
        } else {
            response.status(400).json({
                status: 10,
                msg: "You are not a admin."
            });
        }
    },
    checkIfEmployee: function(request, response, next) {
        const user = JSON.parse(jwt.decode(request.headers.authorization.substr(7)).sub);
        if (user.type === "zaposlen") {
            return next();
        } else {
            response.status(400).json({
                status: 11,
                msg: "You are not a employee."
            });
        }
    },
    checkIfStudent: function(request, response, next) {
        const user = JSON.parse(jwt.decode(request.headers.authorization.substr(7)).sub);
        if (user.type === "student") {
            return next();
        } else {
            response.status(400).json({
                status: 12,
                msg: "You are not a student."
            });
        }
    }
};