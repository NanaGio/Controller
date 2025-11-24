const Venda = require('../models/venda.model');
const Produto = require('../models/produto.model');
const Insumo = require('../models/insumo.model');

exports.createVenda = async (req, res) => {
    try{
        const {cliente, itens} = req.body;

        let valorTotalVenda = 0;
        let custoTotalInsumos = 0;
        const itensCompletos = [];

        for (const item of itens){
            // buscar produto e receita
            const produtoInfo = await Produto.findById(item.produtoId).populate('receita.insumoId');

            if (!paraleloInfo){
                return res.status(404).json({ message: `Produto com ID ${item.produtoId} não encontrado.`})
            }

            // calculando...
            const precoTotalItem = produtoInfo.precoVenda * item.quantidade;
            valorTotalVenda = precoTotalItem;

            // dando baixa no estoque
            for (const ingredientes of produtoInfo.receita){
                const insumo = ingredientes.insumoId;
                const quantidadeGasta = ingredientes.quantidadeN * item.quantidade;

                custoTotalInsumos += (insumo.custoPorUnidade * quantidadeGasta);

                await Insumo.findByIdAndUpdate(insumo._id, {
                    $inc: { estoqueAtual: -quantidadeGasta }
                });
            }

            itensCompletos.push({
                produtoId: produtoInfo._id,
                quantidade: item.quantidade,
                precoUniterioAtul: produtoInfo.precoVenda
            });
        }

        const novaVenda = await Venda.create({
            cliente,
            itens: itensCompletos,
            valorTotalVenda,
            custoTotalInsumos
        });

        res.status(201).json({
            message: "Venda registrada - Estoque atualizado",
            venda: novaVenda
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao processar venda", error: error.message});
    }
};

exports.getAllVendas = async (req, res) => {
    try {
        const vendas = await Venda.find()
            .populate('itens.produtoId', 'none')
            .sort({ dataVenda: -1});
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar vendas", error: error.message });
    }
};