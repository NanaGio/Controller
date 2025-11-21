const mongoose = require('mongoose');

// 1. Primeiro, defina o Schema do seu modelo.
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

// 2. Depois, crie o Model a partir do Schema que você acabou de definir.
const Produto = mongoose.model('Produto', ProdutoSchema);

// 3. Por último, exporte o Model para que ele possa ser usado em outras partes da sua aplicação.
module.exports = Produto;