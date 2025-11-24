const Venda = require('../models/venda.model');

exports.getBM = async (req, res) => {
    try {
        const hoje = new Date();
        const mes = req.query.mes ? parseInt(req.query.mes) : (hoje.getMonth() + 1)
        const ano = req.query.ano ? parseInt(req.query.ano) : (hoje.getFullYear);

        const dataInicio = new Date(ano, mes - 1, 1);
        const dataFim = new Date(ano, mes, 0, 23, 59, 59);

        const balanco = await Venda.aggregate([
            {
                $match: {
                    dataVenda: {
                        $gte: dataInicio,
                        $lte: dataFim
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    receitaTotal: {$sum: "$valorTotalVenda"},
                    custoTotal: { $sum: "$custoTotalInsumos"},
                    qtdVendas: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    receitaTotal: 1,
                    custoTotal: 1,
                    qtdVendas: 1,
                    lucroLiquido: { $subtract: ["$receitaTotal", "$custoTotal"]}
                }
            }
        ]);

        if (balanco.length === 0){
            return res.status(200).json({
                receitaTotal: 0,
                custoTotal: 0,
                lucroLiquido: 0,
                qtdVendas: 0
            });
        }

        res.status(200).json(balanco[0])

    } catch (error) {
        res.status(500).json({ message: "Erro ao calcular balanço", error: error.message})
    }
}
