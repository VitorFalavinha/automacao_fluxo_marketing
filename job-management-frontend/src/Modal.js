import React, { useState, useEffect } from 'react';
import './Modal.css'; // Certifique-se de que este CSS está importado

const Modal = ({ job, onClose, onUpdate }) => {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [client, setClient] = useState(job.client);
  const [status, setStatus] = useState(job.status);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setClient(job.client);
      setStatus(job.status);
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...job,
      title,
      description,
      client,
      status
    });
    onClose();
  };
  
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Título"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Descrição"
          />
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            placeholder="Cliente"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
          </select>
          <button type="submit">Atualizar Job</button>
        </form>
        <button className="close-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
