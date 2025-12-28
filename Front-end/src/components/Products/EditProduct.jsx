import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [insumos, setInsumos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/produto/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Erro ao buscar produto:', err);
                setError('Erro ao carregar detalhes do produto.');
            } finally {
                setLoading(false);
            }
        };

        const fetchInsumos = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/insumos');
                setInsumos(res.data);
            } catch (err) {
                console.error('Erro ao buscar insumos:', err);
            }
        };

        fetchProduct();
        fetchInsumos();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleReceitaChange = (index, e) => {
        const { name, value } = e.target;
        const novaReceita = [...(product.receita || [])];
        novaReceita[index] = { ...novaReceita[index], [name]: value };
        setProduct(prev => ({ ...prev, receita: novaReceita }));
    };

    const adicionarIngrediente = () => {
        setProduct(prev => ({
            ...prev,
            receita: [...(prev.receita || []), { insumoId: '', quantidadeN: '' }]
        }));
    };

    const removerIngrediente = (index) => {
        const novaReceita = (product.receita || []).filter((_, i) => i !== index);
        setProduct(prev => ({ ...prev, receita: novaReceita }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                nome: product.nome,
                descricao: product.descricao,
                precoVenda: Number(product.precoVenda) || 0,
                foto: product.foto,
                receita: (product.receita || []).map(item => ({
                    insumoId: typeof item.insumoId === 'object' ? item.insumoId._id : item.insumoId,
                    quantidadeN: Number(item.quantidadeN)
                }))
            };
            await axios.put(`http://localhost:3001/api/produto/${id}`, payload);
            alert('Produto atualizado com sucesso!');
            navigate(`/products/details/${id}`);
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            alert('Erro ao atualizar produto. Verifique o console.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await axios.delete(`http://localhost:3001/api/produto/${id}`);
                alert('Produto excluído com sucesso!');
                navigate('/products');
            } catch (err) {
                console.error('Erro ao excluir produto:', err);
                alert('Erro ao excluir produto.');
            }
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div>Produto não encontrado.</div>;

    return (
        <div className="product-details-container">
            <button onClick={() => navigate(`/products/details/${id}`)} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={24} height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            <div className="product-details-header">
                <h2>Editar Produto</h2>
            </div>

            <form className="details-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <input type="text" name="nome" value={product.nome || ''} onChange={handleChange} className="details-text" />
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <textarea name="descricao" value={product.descricao || ''} onChange={handleChange} className="details-text" />
                </div>

                <div className="form-group">
                    <label>Preço de Venda (R$)</label>
                    <input type="number" name="precoVenda" value={product.precoVenda ?? ''} onChange={handleChange} step="0.01" className="details-text" />
                </div>

                <div className="form-group">
                    <label>Receita (Ingredientes)</label>
                    {(product.receita || []).map((item, index) => (
                        <div key={index} className="receita-item">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Insumo</label>
                                <select 
                                    name="insumoId" 
                                    value={typeof item.insumoId === 'object' ? item.insumoId._id : item.insumoId} 
                                    onChange={(e) => handleReceitaChange(index, e)} 
                                    className="details-text"
                                >
                                    <option value="">Selecione</option>
                                    {insumos.map(ins => (
                                        <option key={ins._id} value={ins._id}>{ins.nome} ({ins.unidadeMedida})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group" style={{ width: '100px' }}>
                                <label>Qtd</label>
                                <input type="number" name="quantidadeN" value={item.quantidadeN} onChange={(e) => handleReceitaChange(index, e)} className="details-text" />
                            </div>
                            <button type="button" onClick={() => removerIngrediente(index)} className="remove-button">Remover</button>
                        </div>
                    ))}
                    <button type="button" onClick={adicionarIngrediente} className="add-ingredient-button">Adicionar Ingrediente</button>
                </div>

                <div className="details-actions">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" onClick={handleDelete} className="btn btn-danger" style={{ backgroundColor: '#dc3545', color: 'white' }}>Excluir</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;