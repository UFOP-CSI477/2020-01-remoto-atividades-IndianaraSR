const mongoose = require('../database');

const EquipamentosSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },

    modelo:{
        type: String,
        required: true,
    }
},{
    timestamps: true
});

const Equipamentos = mongoose.model('Equipametos', EquipamentosSchema);

module.exports = Equipamentos;