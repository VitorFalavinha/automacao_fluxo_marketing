import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ job, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [client, setClient] = useState(job.client);
  const [status, setStatus] = useState(job.status);
  const [whatsappNumber, setWhatsappNumber] = useState(job?.whatsapp_number || '');
  const [email, setEmail] = useState(job?.email || '');
  const [fileLink, setFileLink] = useState(job?.file_link || ''); // Estado para o link do arquivo

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
      file_link: fileLink, // Atualiza o campo file_link
    };

    onUpdate(updatedJob);
    onClose();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este job?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/<int:pk>/delete/`, {
        method: "DELETE",
      });
  
      if (response.ok || response.status === 204) { // Verifica se o status é 200 ou 204
        alert("Job excluído com sucesso!");
        onDelete(job.id); // Remove o job do estado da lista
        onClose(); // Fecha o modal
      } else {
        const errorMessage = await response.text(); // Captura a mensagem detalhada da resposta
        alert(`Erro ao excluir o job: ${errorMessage || "Resposta inesperada do servidor"}`);
        console.error("Resposta do servidor:", errorMessage);
      }
    } catch (error) {
      console.error("Erro ao excluir o job:", error);
      alert("Erro ao tentar excluir o job. Verifique sua conexão com o servidor.");
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
        <button className="delete-button" onClick={handleDelete}>
          Excluir Job
        </button>
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
