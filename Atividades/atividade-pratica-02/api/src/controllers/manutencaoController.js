const express = require('express');
const { findById } = require('../models/Manutencao');

const router = express.Router();
const Manutencao = require('../models/Manutencao');

router.get('/lista', async(req, res) => {
    const manutencoes = await Manutencao.find({}).populate("equipamento_id").populate("usuario_id");

    res.send(manutencoes);
});

router.post('/', async(req, res) => {

    try {
        const manutencao = await Manutencao.create(req.body);
    
        res.send(manutencao);
    } catch(error) {
        console.log(error);
        res.status(400).send("Não foi possível agendar manutenção.");
    }
});

router.get('/list', async(req, res) => {
    const manutencao = await Manutencao.find({ }).populate("idPeople").populate("idLocalColeta");

    res.send(manutencao);
});

router.get('/:id', async(req, res) => {
     
    const manutencao = await Manutencao.findById(req.params.id).populate("equipamento_id").populate("usuario_id");

    if(!manutencao){
        res.status(404).send({err:"Esta manutenção não está cadastrada!"});
    }else{
        res.send(manutencao);
    }
});


router.delete('/:id', async(req, res) => {
     
    const manutencao = await Manutencao.findByIdAndDelete(req.params.id);

    if(!manutencao){
        res.status(404).send({err:"Esta manutenção não está cadastrada!"});
    }else{
        res.send(manutencao);
    }
});

router.post('/:id/edit', async(req, res) =>{
    try {
        const manutencao = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true});

        res.send(manutencao);
    } catch(error) {
        console.log(error);

        res.status(400).send({err:"Não foi possivel editar a manutencao"});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {

    } catch(error) {
        console.log(error);

        res.status(400).send({err:"Não foi possivel remover a manutencao"});
    }
});

module.exports = (app) => app.use('/manutencao', router);