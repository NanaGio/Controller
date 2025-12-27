import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sales.css';
import '../HomePage/HomePage.css';

const Sales = () => {
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoBack = () => navigate('/home');

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                // Substitui o mock pela chamada real à API
                const response = await axios.get('http://localhost:3001/api/venda');
                setVendas(response.data);
            } catch (err) {
                setError('Erro ao buscar as vendas.');
                console.error('Erro ao buscar vendas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVendas();
    }, []);

    if (loading) {
        return <div className="loading">Carregando vendas...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="sales-list-container">
            <button onClick={handleGoBack} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="sales-header">
                <h2>Histórico de Vendas</h2>
                <div className="sales-header-actions">
                    <button className="add-button" onClick={() => navigate('/sales/new')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" height={30}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Adicionar
                    </button>
                </div>
            </div>
            <div className="sales-table-container">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Itens</th>
                            <th>Valor Total</th>
                            <th>Custo Total</th>
                            <th>Data da Venda</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.length > 0 ? (
                            vendas.map((venda) => (
                                <tr key={venda._id}>
                                    <td data-label="Cliente">{venda.nomeCliente}</td>
                                    <td data-label="Itens">
                                        <ul>
                                            {venda.itens.map(item => (
                                                <li key={item._id}>
                                                    {item.quantidade}x {item.produtoId ? item.produtoId.nome : 'Produto indisponível'}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td data-label="Valor Total">{`R$ ${venda.valorTotalVenda.toFixed(2)}`}</td>
                                    <td data-label="Custo Total">{`R$ ${venda.custoTotalInsumos.toFixed(2)}`}</td>
                                    <td data-label="Data da Venda">{new Date(venda.dataVenda).toLocaleDateString('pt-BR')}</td>
                                    <td data-label="Ações">
                                        <button onClick={() => navigate(`/sales/details/${venda._id}`)} className="btn btn-outline-primary">Detalhes</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-sales-message">Nenhuma venda registrada ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sales;