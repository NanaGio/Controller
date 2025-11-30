import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetails.css'; // Supondo um CSS para estilização

// Dados de exemplo para desenvolvimento visual
const mockProduct = {
    _id: '123',
    nome: 'Bolo de Chocolate Incrível',
    descricao: 'Um bolo delicioso com cobertura de brigadeiro e raspas de chocolate belga.',
    precoVenda: 75.50,
    foto: 'https://via.placeholder.com/400x300.png/000000/FFFFFF?text=Bolo+de+Chocolate',
};

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Simula o carregamento dos dados
        const timer = setTimeout(() => {
            // Em um caso real, você poderia ter um array de mocks e buscar por id
            setProduct(mockProduct);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <div className="product-details-container">
            <button onClick={() => navigate('/products')} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="product-details-header">
                <h2>Detalhes do Produto</h2>
            </div>
            <div className="details-form">
                {product.foto && (
                    <div className="form-group product-image-container">
                        <img src={product.foto} alt={product.nome} className="product-image-detail" />
                    </div>
                )}
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <p className="details-text">{product.nome}</p>
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <p className="details-text">{product.descricao || 'Sem descrição'}</p>
                </div>
                <div className="form-group">
                    <label>Preço de Venda</label>
                    <p className="details-text">R$ {Number(product.precoVenda).toFixed(2)}</p>
                </div>
                <div className="details-actions">
                    {/* Futuramente, você pode adicionar botões de editar e excluir aqui */}
                    <Link to={`/products/edit/${product._id}`} className="btn btn-primary">Editar</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;