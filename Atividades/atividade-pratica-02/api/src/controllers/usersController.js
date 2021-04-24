const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async(req, res) => {
    try{
        const teste = await User.find({ email: req.body.email });

        if(teste[0])
            return res.status(400).send({ error: 'Email já está em uso' });

        const user = await User.create(req.body);

        user.password = undefined;
    
        return res.send({ 
            user,
            token: generateToken({ id: user.id }),            
        });
    
    } catch(err){
        return res.status(400).send({ error: 'Falha no registro'});
    }
});

router.post('/login', async(req, res) =>{
   
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').lean();

    if(!user){
        return res.status(400).send({ error: 'Usuário ou senha incorretos' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Usuário ou senha incorretos' });
    }

    user.password = undefined;

    res.send({
        user: {
            ...user,
        },
        token: generateToken({ id: user._id }), 
    });
});

router.get('/lista', async(req, res) => {
    const users = await User.find({});

    res.send(users);
});

module.exports = app => app.use('/auth', router);