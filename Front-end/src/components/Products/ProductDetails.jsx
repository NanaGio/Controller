import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css'; // Supondo um CSS para estilização

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/produto/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Erro ao carregar detalhes do produto.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <div className="product-details-container">
            <button onClick={() => navigate('/products')} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={24} height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="product-details-header">
                <h2>Detalhes do Produto</h2>
            </div>
            <div className="details-form">
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <p className="details-text">{product?.nome || 'Nome não disponível'}</p>
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <p className="details-text">{product?.descricao || 'Sem descrição'}</p>
                </div>
                <div className="form-group">
                    <label>Preço de Venda</label>
                    <p className="details-text">
                        {product?.precoVenda ? `R$ ${Number(product.precoVenda).toFixed(2)}` : 'Preço não definido'}
                    </p>
                </div>
                <div className="details-actions">
                    <Link to={`/products/edit/${product._id}`} className="btn btn-primary">Editar</Link>
                    <Link to={`/products/delete/${product._id}`} className="btn btn-danger">Excluir</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;