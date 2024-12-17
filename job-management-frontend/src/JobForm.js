import "./JobForm.css";
import React, { useState } from "react";

const JobForm = ({ onCreate, setJobs }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    status: "pending",
    whatsappNumber: "",
    email: "",
    link: "", 
  });
  const [successMessage, setSuccessMessage] = useState(false); // Mensagem de sucesso

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.whatsappNumber || !formData.email) {
      alert("Por favor, preencha os campos obrigatórios: WhatsApp e Email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/jobs/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao criar o job.");

      const newJob = await response.json();
      setJobs((prev) => [...prev, newJob].sort((a, b) => a.status.localeCompare(b.status)));

      // Exibir a mensagem de sucesso e limpar os campos
      setSuccessMessage(true);
      setFormData({
        title: "",
        description: "",
        client: "",
        status: "pending",
        whatsappNumber: "",
        email: "",
        link: "",
      });
    } catch (error) {
      console.error("Erro ao criar o job:", error);
      alert("Erro ao criar o job. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      {!successMessage ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Título"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Descrição"
            required
          />
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Cliente"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
          </select>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            placeholder="Número de WhatsApp"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="url"
            name="link"
            value={formData.fileLink}
            onChange={handleInputChange}
            placeholder="Link do Arquivo"
          />
          <button type="submit">Criar Job</button>
        </form>
      ) : (
        <div>
          <h3>Job criado com sucesso!</h3>
          <button onClick={() => setSuccessMessage(false)}>Criar novo job</button>
          <button onClick={onCreate}>Ver lista de jobs</button>
        </div>
      )}
    </div>
  );
};

export default JobForm;
