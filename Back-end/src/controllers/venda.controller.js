const Venda = require('../models/venda.model');
const Produto = require('../models/produto.model');
const Insumo = require('../models/insumo.model');

exports.createVenda = async (req, res) => {
    try {
        const { nomeCliente, itens } = req.body; // ← CORRIGIDO

        let valorTotalVenda = 0;
        let custoTotalInsumos = 0;
        const itensCompletos = [];

        for (const item of itens) {
            const produtoInfo = await Produto.findById(item.produtoId).populate('receita.insumoId');
            
            if (!produtoInfo) {
                return res.status(404).json({ message: `Produto com ID ${item.produtoId} não encontrado.` });
            }

            const precoTotalItem = produtoInfo.precoVenda * item.quantidade;
            valorTotalVenda += precoTotalItem;

            for (const ingrediente of produtoInfo.receita) {
                const insumo = ingrediente.insumoId;
                const quantidadeGasta = ingrediente.quantidadeN * item.quantidade;

                const custoIngrediente = insumo.custoPorUnidade * (quantidadeGasta / 1000);
                custoTotalInsumos += custoIngrediente;

                await Insumo.findByIdAndUpdate(insumo._id, {
                    $inc: { estoqueAtual: -quantidadeGasta }
                });
            }

            itensCompletos.push({
                produtoId: produtoInfo._id,
                quantidade: item.quantidade,
                precoUnitarioMomento: produtoInfo.precoVenda
            });
        }

        const novaVenda = await Venda.create({
            nomeCliente: nomeCliente, // ← CORRIGIDO
            itens: itensCompletos,
            valorTotalVenda,
            custoTotalInsumos
        });

        res.status(201).json({
            message: "Venda registrada - Estoque atualizado",
            venda: novaVenda
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao processar venda", error: error.message });
    }
};

exports.getAllVendas = async (req, res) => {
    try {
        const vendas = await Venda.find()
            .populate('itens.produtoId', 'nome')
            .sort({ dataVenda: -1});
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar vendas", error: error.message });
    }
};

exports.getVendaById = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Venda.findById(id)
            .populate('itens.produtoId', 'nome');
        
        if (!venda) {
            return res.status(404).json({ message: "Venda não encontrada." });
        }
        res.status(200).json(venda);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar venda", error: error.message });
    }
};

// Adicione estes métodos que estão faltando:

exports.updateVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const vendaAtualizada = await Venda.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!vendaAtualizada) {
            return res.status(404).json({ message: "Venda não encontrada." });
        }
        res.status(200).json({
            message: "Venda atualizada com sucesso!",
            venda: vendaAtualizada
        });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar venda", error: error.message });
    }
};

exports.deleteVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const vendaDeletada = await Venda.findByIdAndDelete(id);
        
        if (!vendaDeletada) {
            return res.status(404).json({ message: "Venda não encontrada." });
        }
        res.status(200).json({ message: "Venda deletada com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar venda", error: error.message });
    }
};