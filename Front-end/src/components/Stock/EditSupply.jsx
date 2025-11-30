import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditSupply.css';

const EditSupply = () => {
    const [supply, setSupply] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupply = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/insumos/${id}`);
                setSupply(response.data);
            } catch (error) {
                console.error("Erro ao buscar insumo:", error);
                setSupply(null); // Garante que não tentará renderizar dados inválidos
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
            await axios.put(`http://localhost:3001/api/insumos/${id}`, supply);
            alert('Insumo atualizado com sucesso!');
            // Navega de volta para a lista de estoque
            navigate('/stock');
        } catch (error) {
            console.error('Erro ao atualizar insumo:', error);
            alert('Erro ao atualizar insumo. Verifique o console.');
        }
    };

    if (loading) {
        return <div className="loading">Carregando formulário...</div>;
    }

    if (!supply) {
        return <div>Insumo não encontrado.</div>;
    }

    return (
        <div className="edit-supply-container">
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
                    <input type="text" name="unidadeMedida" value={supply.unidadeMedida} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Valor Unitário (R$)</label>
                    <input
                        type="number"
                        name="valorUnitario"
                        value={supply.custoPorUnidade}
                        onChange={handleChange}
                        className="form-control"
                        step="0.01"
                        required
                    />
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