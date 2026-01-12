import React, { useState } from 'react';
import styles from './StartScreen.module.css';
import Header from '../Header/Header';

function StartScreen({ onLogin }) {
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim() === '') {
      alert('Por favor, digite seu nome para continuar.');
      return;
    }
    onLogin(name);
  };

  return (
    <>
    <Header />
    <div className={styles.container} style={{ marginTop: '70px', height: 'calc(100vh - 70px)' }}>
      <div 
        className={styles.welcomeSection} 
      >
        <h1 className={styles.welcomeText}>Bem-vindo(a) ao Controller!</h1>
        <h2 className={styles.welcomeDescription}>
          O melhor gerenciador financeiro para seu negócio.
        </h2>
      </div>
      <div className={styles.paragrapSection}>

      </div>

      <div className={styles.formSection}>
        <label htmlFor="name" className={styles.nameLabel}>Qual é o seu nome?</label>
        <input
          type="text"
          id="name"
          className={styles.nameInput}
          placeholder="Ex: Maria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleContinue} className={styles.continueButton}>Continuar</button>
      </div>
    </div>
    </>
  );
}

export default StartScreen;