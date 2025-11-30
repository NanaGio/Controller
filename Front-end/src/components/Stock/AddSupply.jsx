import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddSupply.css';

const AddSupply = () => {
    const [supply, setSupply] = useState({
        nome: '',
        // O modelo do back-end espera 'estoqueAtual'
        estoqueAtual: '',
        unidadeMedida: 'g', // Definindo um padrão
        custoPorUnidade: ''
    });
    const navigate = useNavigate();

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
            // Converte custoPorUnidade para número (garante tipo correto)
            const dataToSend = {
                ...supply,
                estoqueAtual: Number(supply.estoqueAtual),
                custoPorUnidade: Number(supply.custoPorUnidade)
            };
            // Envia os dados para a API de insumos
            await axios.post('http://localhost:3001/api/insumos', dataToSend);
            alert('Insumo adicionado com sucesso!');
            // Navega de volta para a lista de estoque
            navigate('/stock');
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            console.error('Erro ao adicionar insumo:', errorMessage);
            alert(`Erro ao adicionar insumo: ${errorMessage}`);
        }
    };

    return (
        <div className="add-supply-container">
            <div className="add-supply-header">
                <h2>Adicionar Novo Insumo</h2>
            </div>
            <form onSubmit={handleSubmit} className="add-supply-form">
                <div className="form-group">
                    <label>Nome do Insumo</label>
                    <input
                        type="text"
                        name="nome"
                        value={supply.nome}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ex: Farinha de Trigo"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantidade</label>
                    <input
                        type="number"
                        name="estoqueAtual"
                        value={supply.estoqueAtual}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ex: 1000"
                        required
                    />
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
                    <input
                        type="number"
                        name="custoPorUnidade"
                        value={supply.custoPorUnidade}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ex: 15.50"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Salvar Insumo</button>
                    <button type="button" onClick={() => navigate('/stock')} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AddSupply;