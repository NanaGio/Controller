import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SaleDetails.css';
import '../HomePage/HomePage.css';

const SaleDetails = () => {
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const handleGoBack = () => navigate('/sales');

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/venda/${id}`);
                setSale(response.data);
            } catch (err) {
                setError('Erro ao buscar os detalhes da venda.');
                console.error('Erro ao buscar venda:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleDetails();
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
            const deleteVenda = async () => {
                try {
                    await axios.delete(`http://localhost:3001/api/venda/${id}`);
                    alert('Venda excluída com sucesso!');
                    navigate('/sales');
                } catch (err) {
                    alert('Erro ao excluir a venda.');
                    console.error('Erro ao excluir venda:', err);
                }
            };
            deleteVenda();
        }
    };

    if (loading) {
        return <div className="loading">Carregando detalhes da venda...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="sale-details-container">
            <button onClick={handleGoBack} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="sale-details-header">
                <h2>Detalhes da Venda</h2>
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