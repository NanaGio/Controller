// importar banco qnd fizer

//logica das coisa

//get
exports.getAllInsumos = async (req, res) => {
    console.log("CHAMOU A ROTA GET /insumos (MOCK");
    const insumosMockados = [
        {id: "1", nome: "Farinha de trigo (Mock)", estoqueAtual: 10}, 
        {id: "2", nome: "Morang0 (Mock)", estoqueAtual: 5},
        {id: "3", nome: "Chocolate em pó", estoqueAtual: 7}
    ];
    res.status(200).json(insumosMockados);   
};

//post
exports.createInsumo = async (req, res) => {
    const dadosRecebidos = req.body;
    console.log("POST /insumos (MOCK) CHAMADO ", dadosRecebidos);

    res.status(201).json({
        message: "TODO: Salvar este insumo no banco de dados",
        dados: dadosRecebidos
    });
};

//put
exports.updateInsumo = async (req, res) => {
    const {id} = req.params;
    const dadosRecebidos = req.body;
    console.log(`PUT /insumos/${id} (MOCK)`);

    res.status(200).json({
        message: `TODO: Atualizar o insumo com ID ${id} no banco`,
        data: dadosRecebidos
    })
};

//delete
exports.deleteInsumo = async (req, res) => {
    const {id} = req.params;
    console.log(`DELETE /insumos/${id} (MOCK)`);

    res.status(200).json({
        message: `TODO: Deletar o insumo com ID ${id} do banco`
    });
};
