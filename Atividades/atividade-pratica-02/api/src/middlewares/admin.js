const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../models/User');

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ erro: 'O token não foi informado' });
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, authConfig.secret, async (err, decoded) =>{
        if(err){
            return res.status(401).send({ error: 'Token inválido' });
        }

        const user = await User.findById(decoded.id);

        if(!user.admin)
            return res.status(400).send({ error: "Você não tem permissão para isso" });
        
        req.userId = decoded.id;
        return next();
    });
};