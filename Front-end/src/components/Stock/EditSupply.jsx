import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditSupply.css';

const EditSupply = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supply, setSupply] = useState({
        nome: '',
        estoqueAtual: '',
        unidadeMedida: 'g',
        custoPorUnidade: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSupply = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/insumos/${id}`);
                setSupply(response.data);
            } catch (err) {
                console.error("Erro ao carregar insumo:", err);
                setError("Erro ao carregar dados do insumo.");
            } finally {
                setLoading(false);
            }
        };
        fetchSupply();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupply(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...supply,
                estoqueAtual: Number(supply.estoqueAtual),
                custoPorUnidade: Number(supply.custoPorUnidade)
            };
            await axios.put(`http://localhost:3001/api/insumos/${id}`, dataToSend);
            alert('Insumo atualizado com sucesso!');
            navigate('/stock');
        } catch (error) {
            console.error('Erro ao atualizar insumo:', error);
            alert('Erro ao atualizar insumo.');
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="edit-supply-container">
            <button onClick={() => navigate('/stock')} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="edit-supply-header">
                <h2>Editar Insumo</h2>
            </div>
            <form onSubmit={handleSubmit} className="edit-supply-form">
                <div className="form-group">
                    <label>Nome do Insumo</label>
                    <input type="text" name="nome" value={supply.nome} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Quantidade</label>
                    <input type="number" name="estoqueAtual" value={supply.estoqueAtual} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Unidade de Medida</label>
                    <select name="unidadeMedida" value={supply.unidadeMedida} onChange={handleChange} className="form-control" required>
                        <option value="g">Grama (g)</option>
                        <option value="kg">Quilograma (kg)</option>
                        <option value="ml">Mililitro (ml)</option>
                        <option value="litro">Litro (litro)</option>
                        <option value="unidade">Unidade (unidade)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Valor Unitário (R$)</label>
                    <input type="number" name="custoPorUnidade" value={supply.custoPorUnidade} onChange={handleChange} className="form-control" step="0.01" required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                    <button type="button" onClick={() => navigate('/stock')} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditSupply;