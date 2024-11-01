// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>Bem-vindo à plataforma "Approve Now!!!"</h1>
      <p>Gerencie seus jobs e acompanhe o progresso de cada um em tempo real.</p>
      <div className="button-group">
        <button onClick={() => navigate('/create-job')} className="primary-button">
          Criar novo job
        </button>
        <button onClick={() => navigate('/jobs')} className="secondary-button">
          Mostrar jobs em andamento
        </button>
      </div>
    </div>
  );
};

export default HomePage;
