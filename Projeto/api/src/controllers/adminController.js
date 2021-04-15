const express = require('express');
const adminMiddleware = require('../middlewares/admin');
const FormCovid = require('../models/FormCovid');
const FormPosCovid = require('../models/FormPosCovid');

const router =  express.Router();

router.use(adminMiddleware);

router.get('/form/covid', async(req, res) => {
    try {
        const formsCovid = await FormCovid.find({});
        
        return res.send(formsCovid);
    }catch(error) {
        return res.status(400).send({ error: "Não foi possível recuperar os formulários do covid" });
    }
});

router.get('/form/pos_covid', async (req, res) => {
    try {
        const formsPosCovid = await FormPosCovid.find({});

        return res.send(formsPosCovid);
    } catch(error) {
        return res.status(400).send({ error: "Não foi possível recuperar os formulários do pós covid" });
    }
});

router.delete('/form/:id', async(req, res) => {
    try {
        const formCovid = FormCovid.findOne({ _id: req.params.id });
        const formPosCovid = FormPosCovid.findOne({ _id: req.params.id });
        
        if(formCovid) {
            await FormCovid.deleteOne({ _id: req.params.id });
        } else if(formPosCovid) {
            await FormPosCovid.deleteOne({ _id: req.params.id });
        } else {
            return res.status(400).send({ error: "Não foi possível deletar o form" });
        }

        res.status(200).send({ message: "Apagado com sucesso" });
    }catch(error){
        return res.status(400).send({ error: "Não foi possível deletar o form" });
    }
});

module.exports = app => app.use('/admin', router);