import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddSale.css';

const AddSale = () => {
    const [sale, setSale] = useState({
        nomeCliente: '',
        dataVenda: new Date().toISOString().split('T')[0], // Padrão para hoje
        itens: [{ produtoId: '', quantidade: 1 }]
    });
    const [availableProducts, setAvailableProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Busca os produtos reais da API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/produto');
                setAvailableProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos", error);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItens = [...sale.itens];
        newItens[index][name] = value;
        setSale(prevState => ({ ...prevState, itens: newItens }));
    };

    const addItem = () => {
        setSale(prevState => ({
            ...prevState,
            itens: [...prevState.itens, { produtoId: '', quantidade: 1 }]
        }));
    };

    const removeItem = (index) => {
        const newItens = sale.itens.filter((_, i) => i !== index);
        setSale(prevState => ({ ...prevState, itens: newItens }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envia os dados da nova venda para a API
            await axios.post('http://localhost:3001/api/venda', sale);
            alert('Venda registrada com sucesso!');
            // Navega de volta para a lista de vendas
            navigate('/sales');
        } catch (error) {
            console.error('Erro ao registrar venda:', error);
            alert('Erro ao registrar venda. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className="add-sale-container">
            <div className="add-sale-header">
                <h2>Adicionar Nova Venda</h2>
            </div>
            <form onSubmit={handleSubmit} className="add-sale-form">
                <div className="form-group">
                    <label>Nome do Cliente</label>
                    <input type="text" name="nomeCliente" value={sale.nomeCliente} onChange={handleChange} className="form-control" placeholder="Nome do cliente" required />
                </div>
                <div className="form-group">
                    <label>Data da Venda</label>
                    <input type="date" name="dataVenda" value={sale.dataVenda} onChange={handleChange} className="form-control" required />
                </div>

                <div className="form-group">
                    <label>Itens da Venda</label>
                    {sale.itens.map((item, index) => (
                        <div key={index} className="sale-item-group">
                            <select name="produtoId" value={item.produtoId} onChange={(e) => handleItemChange(index, e)} className="form-control" required>
                                <option value="">Selecione um produto</option>
                                {availableProducts.map(prod => (
                                    <option key={prod._id} value={prod._id}>{prod.nome}</option>
                                ))}
                            </select>
                            <input type="number" name="quantidade" value={item.quantidade} onChange={(e) => handleItemChange(index, e)} className="form-control quantity-input" min="1" required />
                            {sale.itens.length > 1 && (
                                <button type="button" onClick={() => removeItem(index)} className="btn btn-danger-outline">Remover</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="btn btn-outline-primary add-item-btn">Adicionar Item</button>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Salvar Venda</button>
                    <button type="button" onClick={() => navigate('/sales')} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AddSale;