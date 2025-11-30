import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css'; // Crie este arquivo para os estilos específicos
import '../HomePage/HomePage.css'; // Reutilizando estilos da HomePage

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/produtos'); // Ajuste a URL se necessário
        setProducts(response.data);
      } catch (err) {
        setError('Falha ao carregar os produtos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleGoBack = () => navigate('/home');

  return (
    <div className="products-container">
      <button onClick={handleGoBack} className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 className="homepage-greeting">Produtos</h1>
      <p className="homepage-subtitle">Cadastre e gerencie os seus produtos</p>

      <div className="add-button-container">
        <button className="add-button" onClick={() => navigate('/products/new')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" height={30}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar
        </button>
      </div>

      {loading && <p>Carregando produtos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="action-buttons-container">
          {products.length > 0 ? (
            products.map(product => (
              <button key={product._id} className="action-button" onClick={() => navigate(`/products/details/${product._id}`)}>
                <div className="button-text-container">
                  <div className="button-title">{product.nome}</div>
                  <p className="button-paragraph">Detalhes e edição do produto</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" height={20}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
            ))
          ) : (
            <p>Nenhum produto cadastrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;