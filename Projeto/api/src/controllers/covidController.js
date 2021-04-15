const express = require('express');
const authMiddleware = require('../middlewares/auth');
const FormCovid = require('../models/FormCovid');

const router =  express.Router();

router.use(authMiddleware);

router.post('/', async(req, res) => {
    try{
        const form = await FormCovid.create({
            user: req.userId,
            ...req.body,
        });

        return res.send({
            form,
        });

    } catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Falha ao responder' });
    }
});

module.exports = app => app.use('/form_covid', router);