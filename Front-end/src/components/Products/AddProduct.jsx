import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css'; // Crie este arquivo para estilização

const AddProduct = () => {
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        precoVenda: '',
        foto: '',
        receita: [{ insumoId: '', quantidadeN: '' }]
    });
    const [insumos, setInsumos] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Busca os insumos da API para popular o dropdown
        const fetchInsumos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/insumos'); // Ajuste a URL da sua API
                setInsumos(response.data);
            } catch (err) {
                setError('');
                console.error(err);
            }
        };

        fetchInsumos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReceitaChange = (index, e) => {
        const { name, value } = e.target;
        const novaReceita = [...produto.receita];
        novaReceita[index][name] = value;
        setProduto(prevState => ({
            ...prevState,
            receita: novaReceita
        }));
    };

    const adicionarIngrediente = () => {
        setProduto(prevState => ({
            ...prevState,
            receita: [...prevState.receita, { insumoId: '', quantidadeN: '' }]
        }));
    };

    const removerIngrediente = (index) => {
        const novaReceita = produto.receita.filter((_, i) => i !== index);
        setProduto(prevState => ({
            ...prevState,
            receita: novaReceita
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validação simples
        if (!produto.nome || !produto.precoVenda || produto.receita.some(item => !item.insumoId || !item.quantidadeN)) {
            setError('Por favor, preencha todos os campos obrigatórios (*).');
            return;
        }

        try {
            await axios.post('http://localhost:3001/api/produto', produto); // Ajuste a URL da sua API
            setSuccess('Produto cadastrado com sucesso!');
            // Limpar formulário e redirecionar após 2 segundos
            setTimeout(() => navigate('/products'), 2000);
        } catch (err) {
            setError('Erro ao cadastrar o produto. Verifique os dados e tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className="product-form-container">
             <button onClick={() => navigate('/products')} className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" height={24}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h1>Cadastrar Produto</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome do Produto *</label>
                    <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" name="descricao" value={produto.descricao} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="precoVenda">Preço de Venda (R$) *</label>
                    <input type="number" id="precoVenda" name="precoVenda" value={produto.precoVenda} onChange={handleChange} min="0" step="0.01" required />
                </div>

                {produto.receita.map((item, index) => (
                    <div key={index} className="receita-item">
                        <div className="form-group">
                            <label>Insumo</label>
                            <select name="insumoId" value={item.insumoId} onChange={(e) => handleReceitaChange(index, e)} required>
                                <option value="">Selecione um insumo</option>
                                {insumos.map(insumo => (
                                    <option key={insumo._id} value={insumo._id}>
                                        {insumo.nome} ({insumo.unidadeMedida})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="number" name="quantidadeN" value={item.quantidadeN} onChange={(e) => handleReceitaChange(index, e)} min="0" required />
                        </div>
                        {produto.receita.length > 1 && (
                            <button type="button" onClick={() => removerIngrediente(index)} className="remove-button">
                                Remover
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={adicionarIngrediente} className="add-ingredient-button">
                    Adicionar Ingrediente
                </button>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="submit" className="submit-button">Salvar Produto</button>
            </form>
        </div>
    );
};

export default AddProduct;

