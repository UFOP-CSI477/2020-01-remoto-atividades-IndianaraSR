const express = require('express');
const Equipamentos = require('../models/Equipamentos');

const router = express.Router();
const Eqipamento = require('../models/Equipamentos');
const Manutencao = require('../models/Manutencao');

router.post('/', async(req, res) => {
    const teste = await Eqipamento.find({ name: req.body.nome });

    const equipamento = await Eqipamento.create(req.body);
 
    res.send(equipamento);

});

router.get('/lista', async(req, res) => {
    const equipamentos = await Eqipamento.find({ });

    res.send(equipamentos);
});

router.delete('/:id', async(req, res) => {
    const equipamento = await Eqipamento.findByIdAndDelete(req.params.id);

    if(!equipamento){
        res.status(404).send({err:"Esse equipamento não está cadastrado!"});
    }else{

        await Equipamentos.findByIdAndRemove(req.params.id);

        res.send(equipamento);
    }

});

router.get('/:id', async(req, res) => {
    const equipamento = await Eqipamento.findById(req.params.id);

    if(!equipamento){
        res.status(404).send({err:"Esse equipamento não existe!"});
    }else{
        res.send(equipamento);
    }
});

router.post('/:id/edit', async(req, res) =>{
    const equipamento = await Eqipamento.findByIdAndUpdate(req.params.id, req.body, { new: true});

    res.send(equipamento);
});

module.exports = (app) => app.use('/equipamento', router);
