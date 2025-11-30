const Insumo = require('../models/insumo.model');

// POST /api/insumos
exports.createInsumo = async (req, res) => {
    try {
        const novoInsumo = await Insumo.create(req.body);
        res.status(201).json({
            message: "Insumo criado com sucesso!",
            insumo: novoInsumo
        });
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar insumo", error: error.message });
    }
};

// GET /api/insumos
exports.getAllInsumos = async (req, res) => {
    try {
        const todosInsumos = await Insumo.find();
        res.status(200).json(todosInsumos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar insumos", error: error.message });
    }
};

// GET /api/insumos/:id
exports.getInsumoById = async (req, res) => {
    try {
        const insumo = await Insumo.findById(req.params.id);
        if (!insumo) return res.status(404).json({ message: "Insumo não encontrado." });
        res.status(200).json(insumo);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar insumo", error: error.message });
    }
};

// PUT /api/insumos/:id
exports.updateInsumo = async (req, res) => {
    try {
        const insumoAtualizado = await Insumo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!insumoAtualizado) return res.status(404).json({ message: "Insumo não encontrado." });
        res.status(200).json({ message: "Insumo atualizado com sucesso!", insumo: insumoAtualizado });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar insumo", error: error.message });
    }
};

// DELETE /api/insumos/:id
exports.deleteInsumo = async (req, res) => {
    try {
        const insumoDeletado = await Insumo.findByIdAndDelete(req.params.id);
        if (!insumoDeletado) return res.status(404).json({ message: "Insumo não encontrado." });
        res.status(200).json({ message: "Insumo deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar insumo", error: error.message });
    }
};