// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button className="back-button" onClick={() => navigate('/')}>
      Voltar para a Home
    </button>
  );
};

export default BackButton;
