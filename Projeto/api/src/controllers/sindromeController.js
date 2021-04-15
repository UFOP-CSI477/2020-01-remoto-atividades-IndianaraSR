const express = require('express');
const authMiddleware = require('../middlewares/auth');
const FormPosCovid = require('../models/FormPosCovid');

const router =  express.Router();

router.use(authMiddleware);

router.post('/', async(req, res) => {
    try{
        const form = await FormPosCovid.create({
            user: req.userId,
            sindrome: req.body,
        });

        return res.send({
            form,
        });
    } catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/form_pos_covid', router);