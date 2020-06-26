'use strict'
//////////////////////////////// GENERAR TOKEN ///////////////////////////////////////////////////////////
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_PW || '787596df8fde95b71408bb492eb532fac348f5f538dc315c14ccad7f8f6a03ae129122f9659ed239d6d6e047c836d11061086f4f6f36fa60665ff1a21aa87739';
const auth = {};

auth.jwtGenerate = function (user, type) {
    const token = jwt.sign({
        user,
        type
    }, secret);
    return token;
}

//////////////////////////////// DECODIFICAR TOKEN ////////////////////////////////////////////////////////
function jwtDecode(token) {
    const decodificado = jwt.verify(token, secret)
    return decodificado;
}

// MIDDLEWARE
auth.user = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwtDecode(token);
        
        if (verifyToken) {
            if (verifyToken.type === 'user'){
                req.userAuthenticated = verifyToken.user;
                next();
            }
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error in token authentication' });
    }
};

auth.admin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwtDecode(token);
        
        if (verifyToken) {
            if (verifyToken.type === 'admin'){
                req.userAuthenticated = verifyToken.user;
                next();
            }
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error in token authentication' });
    }
};

auth.both = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwtDecode(token);
        
        if (verifyToken) {
            if (verifyToken.type === 'admin' || verifyToken.type === 'user'){
                req.userAuthenticated = verifyToken.user;
                next();
            }
            else{
                res.status(403).json({ error: 'User is not allowed.' })
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error in token authentication' });
    }
};
module.exports = auth;