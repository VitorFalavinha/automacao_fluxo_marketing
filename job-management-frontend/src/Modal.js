import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ job, onClose, onUpdate, onArchive }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('pending'); // Padrão para 'pending'
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fileLink, setFileLink] = useState('');

  // Atualiza os estados quando o job muda
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setClient(job.client);
      setStatus(job.status);
      setWhatsappNumber(job.whatsapp_number || '');
      setEmail(job.email || '');
      setFileLink(job.file_link || '');
    }
  }, [job]);

  // Lida com o envio do formulário para editar o job
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJob = {
      ...job,
      title,
      description,
      client,
      status,
      whatsapp_number: whatsappNumber,
      email,
      file_link: fileLink,
    };

    onUpdate(updatedJob); // Chama a função de atualização
    onClose(); // Fecha o modal
  };

  // Lida com a ação de arquivar o job
  const handleArchive = async () => {
    const confirmArchive = window.confirm("Tem certeza de que deseja arquivar este job?");
    if (!confirmArchive) return;

    try {
        const response = await fetch(`http://localhost:8000/api/jobs/${job.id}/archive/`, {
            method: "PATCH",
        });

        if (response.ok) {
            alert("Job arquivado com sucesso!");
            onArchive(job.id); // Chama a função para atualizar o estado no componente pai
            onClose(); // Fecha o modal
        } else {
            const errorMessage = await response.json();
            alert(`Erro ao arquivar o job: ${errorMessage.detail || "Resposta inesperada do servidor"}`);
        }
    } catch (error) {
        alert("Erro ao tentar arquivar o job. Verifique sua conexão com o servidor.");
        console.error("Erro de conexão:", error);
    }
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

          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="Número de WhatsApp"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="text"
            value={fileLink}
            onChange={(e) => setFileLink(e.target.value)}
            placeholder="Link do arquivo"
          />
          
          {fileLink && (
            <a href={fileLink} target="_blank" rel="noopener noreferrer">
              Visualizar arquivo
            </a>
          )}

          <button type="submit">Salvar</button>
        </form>
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
        <button className="archive-button" onClick={handleArchive}>
          Arquivar Job
        </button>
      </div>
    </div>
  );
};

export default Modal;

