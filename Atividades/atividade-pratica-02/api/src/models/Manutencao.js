const mongoose = require('../database');

const ManutencaoSchema = new mongoose.Schema({
    equipamento_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Equipametos',
        required: true,
    },

    usuario_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },

    descricao: {
        type: String,
        required: true
    },

    data_limite: {
        type: Date,
        required: true,
    },

    type: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    }
},{
    timestamps: true,
});

const Manutencao = mongoose.model('Manutencao', ManutencaoSchema);

module.exports = Manutencao;