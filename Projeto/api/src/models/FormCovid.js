const mongoose = require('../database');

const sintomaType = {
    type: Boolean,
    required: true,
};

const rangeType = {
    type: Number,
    min: 0,
    max: 10
}

const FormCovidSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    
    padraoComportamental: {
        sexo:{
            type: String,
            enum: ["Fem", "Masc", "Outro"],
            require: true,
        },
    
        nascimento: {
            type: Date,
            required: true,
        },
    
        suscetivel: rangeType,
        necessidade_medica: rangeType,
        contato_diario: rangeType,
        sair_semana: rangeType,
        visita_lugar_risco: rangeType,
        sair_casualmente: sintomaType
    },
    grupoRisco: {
        acima_peso: sintomaType,
        doencas_cardiaca: sintomaType,
        doencas_pulmonar: sintomaType,
        baixa_imunidade: sintomaType,
        doencas_renais: sintomaType,
        diabetico: sintomaType,
        gestantes: sintomaType,
        doencas_figado: sintomaType,
        grupo_risco: sintomaType
    },
    sintomas: {
        moderado: {
            tosse_persistente: sintomaType,
            febre_persistente: sintomaType,
            diarreia: sintomaType,
            cansaco: sintomaType,
            dor_de_cabeca: sintomaType,
            perda_paladar: sintomaType,
            perda_olfato: sintomaType,
        },
        grave: {
            falta_ar: sintomaType,
            dor_peito: sintomaType,
            pressao_peito: sintomaType,
            perda_fala: sintomaType,
            perda_movimento: sintomaType,
            dificuldade_alimentar: sintomaType
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('FormCovid', FormCovidSchema);

