import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SaleDetails.css';

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

const SaleDetails = () => {
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Simula o carregamento dos dados de uma venda específica
        const timer = setTimeout(() => {
            // Em um caso real, você buscaria a venda pelo 'id'
            setSale(mockSale);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    const handleDelete = () => {
        // Lógica para deletar a venda (será implementada no futuro)
        if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
            console.log(`Excluindo venda com ID: ${id}`);
            // Após a exclusão, navegar de volta para a lista
            navigate('/sales');
        }
    };

    if (loading) {
        return <div className="loading">Carregando detalhes da venda...</div>;
    }

    if (!sale) {
        return <div>Venda não encontrada.</div>;
    }

    return (
        <div className="sale-details-container">
            <div className="sale-details-header">
                <h2>Detalhes da Venda</h2>
                <button onClick={() => navigate('/sales')} className="btn btn-secondary">Voltar</button>
            </div>
            <div className="details-card">
                <div className="details-group">
                    <label>Cliente</label>
                    <p>{sale.nomeCliente}</p>
                </div>
                <div className="details-group">
                    <label>Data da Venda</label>
                    <p>{new Date(sale.dataVenda).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="details-group">
                    <label>Itens Vendidos</label>
                    <ul>
                        {sale.itens.map(item => (
                            <li key={item._id}>{item.quantidade}x {item.produtoId.nome}</li>
                        ))}
                    </ul>
                </div>
                <div className="details-group">
                    <label>Valor Total da Venda</label>
                    <p>R$ {sale.valorTotalVenda.toFixed(2)}</p>
                </div>
                <div className="details-group">
                    <label>Custo Total dos Insumos</label>
                    <p>R$ {sale.custoTotalInsumos.toFixed(2)}</p>
                </div>
                <div className="details-actions">
                    <button onClick={() => navigate(`/sales/edit/${sale._id}`)} className="btn btn-primary">Editar</button>
                    <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
                </div>
            </div>
        </div>
    );
};

export default SaleDetails;