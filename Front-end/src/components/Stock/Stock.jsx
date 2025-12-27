import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Stock.css';
import '../HomePage/HomePage.css';

const Stock = () => {
    const [supplies, setSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                // A rota para buscar insumos é /api/insumo
                const response = await axios.get('http://localhost:3001/api/insumos');
                setSupplies(response.data);
            } catch (err) {
                setError('Erro ao buscar o estoque.');
                console.error('Erro ao buscar estoque:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplies();
    }, []);

    const handleGoBack = () => navigate('/home');

    return (
        <div className="stock-container">
            <button onClick={handleGoBack} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h1 className="homepage-greeting">Estoque</h1>
            <p className="homepage-subtitle">Gerencie os insumos e quantidades disponíveis</p>

            <div className="add-button-container">
                <button className="add-button" onClick={() => navigate('/stock/new')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" height={30}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Adicionar
                </button>
            </div>

            {loading && <p>Carregando estoque...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <div className="action-buttons-container">
                    {supplies.length > 0 ? (
                        supplies.map(supply => (
                            <button key={supply._id} className="action-button" onClick={() => navigate(`/stock/edit/${supply._id}`)}>
                                <div className="button-text-container">
                                    <div className="button-title">{supply.nome}</div>
                                    <p className="button-paragraph">{`${supply.estoqueAtual} ${supply.unidadeMedida}`}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" height={20}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        ))
                    ) : (
                        <p>Nenhum insumo cadastrado.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Stock;