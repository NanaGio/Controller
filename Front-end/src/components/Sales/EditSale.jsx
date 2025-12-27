import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditSale.css';
import '../HomePage/HomePage.css';

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
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const handleGoBack = () => navigate(`/sales/details/${id}`);

    useEffect(() => {
        const fetchSaleForEdit = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/venda/${id}`);
                const formattedSale = {
                    ...response.data,
                    dataVenda: new Date(response.data.dataVenda).toISOString().split('T')[0]
                };
                setSale(formattedSale);
            } catch (err) {
                setError('Erro ao buscar os dados da venda.');
                console.error('Erro ao buscar venda:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleForEdit();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/venda/${id}`, sale);
            alert('Alterações salvas com sucesso!');
            navigate(`/sales/details/${id}`);
        } catch (err) {
            alert('Erro ao salvar alterações.');
            console.error('Erro ao atualizar venda:', err);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!sale) {
        return <div>Venda não encontrada.</div>;
    }

    return (
        <div className="edit-sale-container">
            <button onClick={handleGoBack} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
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