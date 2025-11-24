const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        trim: true
    },
    descricao:{
        type: String,
    },
    precoVenda:{
        type: Number,
        required: true,
        min: 0
    },
    foto: {
        type: String,
        default: "https://placehold.co/400"
    },
    
    receita: [
        {
            insumoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Insumo',
                required: true
            },
            quantidadeN: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;