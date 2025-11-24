const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
    nomeCliente:{
        type: String,
        required: true,
        default: "Cliente Balcão"
    },
    itens: [
        {
            produtoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto',
                required: true
            },
            quantidade: {
                type: Number,
                required: true,
                min: 1
            },
            precoUnitarioMomento:{
                type: Number,
                required: true
            }
        },
    ],
    valorTotalVenda: {
        type: Number,
        required: true
    },
    custoTotalInsumos: {
        type: Number,
        required: true
    },
    dataVenda:{
        type: Date,
        default: Date.now
    }
});

const Venda = mongoose.model('Venda', vendaSchema);
module.exports = Venda;