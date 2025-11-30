import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-greeting">Olá, {name}</h1>
      <p className="homepage-subtitle">Acompanhe os dados financeiros do seu negócio.</p>
      <div className="stats-box">
        <div className="stats-month">Junho</div>
        <div className="stats-label">Receita mensal</div>
        <div className="stats-value">R$ 1.234,56</div>
      </div>
      <div className="action-buttons-container">
        <button className="action-button" onClick={() => navigate('/products')}>
          <div className="button-text-container">
            <div className="button-title">Produtos</div>
            <p className="button-paragraph">Cadastre e gerencie os seus produtos</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6" height={20}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button className="action-button" onClick={() => navigate('/sales')}>
          <div className="button-text-container">
            <div className="button-title">Vendas</div>
            <p className="button-paragraph">Verifique o controle de vendas mensais</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6" height={20}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button className="action-button" onClick={() => navigate('/stock')}>
          <div className="button-text-container">
            <div className="button-title">Estoque</div>
            <p className="button-paragraph">Gerencie seu estoque baseado em seus insumos</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6" height={20}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;