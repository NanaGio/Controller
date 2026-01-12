import React from 'react';
import './Header.css';
// import logo from '../../assets/images/logo.png'; // Descomente quando a imagem estiver na pasta correta
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <img src={logo} alt="Logo DeliCake" className="header-logo" />
            </div>
        </header>
    );
};

export default Header;