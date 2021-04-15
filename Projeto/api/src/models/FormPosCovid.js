const mongoose = require('../database');

const FormPosCovidSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },

    sindrome:{
        fadiga:{
            type: Boolean,
            required: true,
        },	
        
        falta_ar:{
            type: Boolean,
            required: true,
        },

        queda_cabelo:{
            type: Boolean,
            required: true,
        },

        dor_muscular:{
            type: Boolean,
            required: true,
        },

        perda_paladar:{
            type: Boolean,
            required: true,
        },
            
        perda_olfato:{
            type: Boolean,
            required: true,
        },

        tontura:{
            type: Boolean,
            required: true,
        },

        dor_peito:{
            type: Boolean,
            required: true,
        },

        trombose:{
            type: Boolean,
            required: true,
        },

        dificuldade_linguagem: {
            type: Boolean,
            required: true,
        },

        dificuldade_raciocinio:{
            type: Boolean,
            required: true,
        },  

        alteracao_menstruacao: {
            type: Boolean,
            required: true,
        }
    }    
}, { timestamps: true });

module.exports = mongoose.model('FormPosCovid', FormPosCovidSchema);