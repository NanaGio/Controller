import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
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
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                nome: product.nome,
                descricao: product.descricao,
                precoVenda: Number(product.precoVenda) || 0,
                foto: product.foto,
                receita: product.receita || []
            };
            await axios.put(`http://localhost:3001/api/produto/${id}`, payload);
            alert('Produto atualizado com sucesso!');
            navigate(`/products/details/${id}`);
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            alert('Erro ao atualizar produto. Verifique o console.');
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
                <div className="details-actions">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" onClick={() => navigate(`/products/details/${id}`)} className="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;