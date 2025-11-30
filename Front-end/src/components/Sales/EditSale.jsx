import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSale.css';

// Dados de exemplo para desenvolvimento visual
const mockSale = {
    _id: '1',
    nomeCliente: 'João da Silva',
    itens: [
        { _id: 'i1', produtoId: { nome: 'Bolo de Chocolate' }, quantidade: 1 },
        { _id: 'i2', produtoId: { nome: 'Torta de Limão' }, quantidade: 2 },
    ],
    valorTotalVenda: 150.50,
    custoTotalInsumos: 75.25,
    dataVenda: new Date().toISOString(),
};

const EditSale = () => {
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Simula o carregamento dos dados para edição
        const timer = setTimeout(() => {
            // Formata a data para o formato YYYY-MM-DD compatível com input[type="date"]
            const formattedSale = {
                ...mockSale,
                dataVenda: new Date(mockSale.dataVenda).toISOString().split('T')[0]
            };
            setSale(formattedSale);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemQuantityChange = (index, value) => {
        const newItens = [...sale.itens];
        // Garante que a quantidade não seja negativa
        newItens[index].quantidade = Math.max(0, parseInt(value, 10));
        setSale(prevState => ({
            ...prevState,
            itens: newItens
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Salvando alterações:', sale);
        // Navega de volta para a página de detalhes após salvar
        navigate(`/sales/details/${id}`);
    };

    if (loading) {
        return <div className="loading">Carregando formulário...</div>;
    }

    if (!sale) {
        return <div>Venda não encontrada.</div>;
    }

    return (
        <div className="edit-sale-container">
            <div className="edit-sale-header">
                <h2>Editar Venda</h2>
            </div>
            <form onSubmit={handleSubmit} className="edit-sale-form">
                <div className="form-group">
                    <label>Cliente</label>
                    <input type="text" name="nomeCliente" value={sale.nomeCliente} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Data da Venda</label>
                    <input type="date" name="dataVenda" value={sale.dataVenda} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Itens</label>
                    {sale.itens.map((item, index) => (
                        <div key={item._id} className="item-edit-group">
                            <span>{item.produtoId.nome}</span>
                            <input type="number" value={item.quantidade} onChange={(e) => handleItemQuantityChange(index, e.target.value)} className="form-control quantity-input" />
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                    <button type="button" onClick={() => navigate(`/sales/details/${id}`)} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditSale;