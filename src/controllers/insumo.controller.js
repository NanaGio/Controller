const Insumo = require('../models/insumo.model');

//post
exports.createInsumo = async (req, res) => {
    try{
        const novoInsumo = await Insumo.create(req.body);
        res.status(201).json({
            message: "Insumo criado com sucesso!",
            insumo: novoInsumo
        })
    } catch (error) {
        res.status(400).json({message: "Erro ao criar insumo", error: error.message});
    }
};


//get
exports.getAllInsumos = async (req, res) => {
    try{
        const todosInsumos = await Insumo.find();
        res.status(200).json(todosInsumos);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar insumos", error: error.message});
    }
};

//put
exports.updateInsumo = async (req, res) => {
    try{
        const { id } = req.params;
        const insumoAtualizado = await Insumo.findByIdAndUpdate(id, req.body, {new: true});

        if(!insumoAtualizado){
            return res.status(404).json({message: "Insumo não econtrado."})
        }
        res.status(200).json({
            message: "Insumo atualizado ! ! !",
            insumo: insumoAtualizado
        })
    } catch (error) {
        res.status(400).json({message: "Erro ao atualizar insumo", error: error.message})
    }
};

//delete
exports.deleteInsumo = async (req, res) => {
    try{
        const {id} = req.params;
        const insumoDeletado = await Insumo.findByIdAndDelete(id);

        if (!insumoDeletado) {
            return res.status(404).json({ message: "Insumo não encontrado."});
        }
        res.status(200).json({ message: "Insumo deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar insumo", error: error.message});
    }
};
