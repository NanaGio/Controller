const mongoose = require('mongoose');

const InsumoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    unidadeMedida:{
        type: String,
        required: true,
        enum: ['g', 'ml', 'unidade']
    },
    custoPorUnidade:{
        type: Number,
        required: true,
        min: 0
    },
    estoqueAtual:{
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
})

const Insumo = mongoose.model('Insumo', InsumoSchema);
module.exports = Insumo;