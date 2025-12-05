import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Stock.css';

const Stock = () => {
    const [supplies, setSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalSpent, setTotalSpent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                // A rota para buscar insumos é /api/insumo
                const response = await axios.get('http://localhost:3001/api/insumos');
                setSupplies(response.data);
                // calcular total gasto: soma de custoPorUnidade * estoqueAtual
                const total = (response.data || []).reduce((acc, s) => {
                    const custo = Number(s.custoPorUnidade) || 0;
                    return acc + custo ;
                }, 0);
                setTotalSpent(total);
            } catch (err) {
                setError('Erro ao buscar o estoque.');
                console.error('Erro ao buscar estoque:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplies();
    }, []);

    if (loading) {
        return <div className="loading">Carregando estoque...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="stock-list-container">
            <div className="stock-header">
                <h2>Gerenciamento de Estoque</h2>
                <div className="stock-header-actions">
                    {/* Botão para adicionar novo insumo (funcionalidade futura) */}
                    <button onClick={() => navigate('/stock/new')} className="btn btn-primary">Adicionar Insumo</button>
                    <button onClick={() => navigate('/home')} className="btn btn-secondary">Voltar</button>
                </div>
            </div>
            <div className="stock-table-container">
                <table className="stock-table">
                    <thead>
                        <tr>
                            <th>Insumo</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.map((supply) => (
                            <tr key={supply._id}>
                                <td data-label="Insumo">{supply.nome}</td>
                                <td data-label="Quantidade">{`${supply.estoqueAtual} ${supply.unidadeMedida}`}</td>
                                <td data-label="Ações">
                                    <button onClick={() => navigate(`/stock/edit/${supply._id}`)} className="btn btn-outline-primary">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="stock-total">
                    <strong>Total gasto em insumos: </strong>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSpent)}</span>
                </div>
        </div>
    );
};

export default Stock;