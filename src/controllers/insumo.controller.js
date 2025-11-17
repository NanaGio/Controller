// importar banco qnd fizer

//logica das coisa
//get
//listar 
exports.getAllInsumos = async (req, res) => {
    console.log("CHAMOU A ROTA GET /insumos (MOCK");
    const insumosMockados = [
        {id: "1", nome: "Farinha de trigo (Mock)", estoqueAtual: 10}, 
    ];
    res.status(200).json(insumosMockados);   
};

//post
exports.createInsumo = async (req, res) => {};

//put
exports.updateInsumo = async (req, res) => {};

//delete
exports.deleteInsumo = async (req, res) => {};
