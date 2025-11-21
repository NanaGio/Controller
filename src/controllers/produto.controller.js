const Produto = require('../models/produto.model');

//post
exports.createProduto = async (req, res) => {
    try{
        const novoProduto = await Produto.create(req.body);
        res.status(201).json({
            message: "Produto criado com sucesso!",
            Produto: novoProduto
        })
    } catch (error) {
        res.status(400).json({message: "Erro ao criar Produto", error: error.message});
    }
};

//get
exports.getAllProdutos = async (req, res) => {
    try{
        const todosProdutos = await Produto.find();
        res.status(200).json(todosProdutos);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar Produtos", error: error.message});
    }
};

//put

exports.updateProduto = async (req, res) => {
    try{
        const { id } = req.params;
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, req.body, {new: true});

        if (!produtoAtualizado){
            return res.status(404).json({message: "Produto não encontrado."})
        }
        res.status(200).json({
            message: "Produto atualizado com sucesso!",
            produto: produtoAtualizado
        });
    } catch (error) {
        res.status(400).json({message: "Erro ao atualizar Produto", error: error.message})
    }
};

//delete
exports.deleteProduto = async (req, res) => {
    try{
        const {id} = req.params;
        const produtoDeletado = await Produto.findByIdAndDelete(id);

        if (!produtoDeletado) {
            return res.status(404).json({ message: "Produto não encontrado."});
        }
            res.status(200).json({ message: "Produto deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Produto", error: error.message});
    }
};