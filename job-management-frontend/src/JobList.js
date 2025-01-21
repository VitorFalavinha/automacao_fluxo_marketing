// JobList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Modal from './Modal';
import JobCard from './JobCard'; 
import './JobList.css'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  // Busca os jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/jobs/');
        if (!response.ok) throw new Error('Erro ao carregar jobs.');
        
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  //modal para editar um job
// JobList.js
const handleUpdate = async (updatedJob) => {
  try {
      const response = await fetch(`http://localhost:8000/api/jobs/${updatedJob.id}/`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedJob), // Envia os dados atualizados
      });

      if (!response.ok) throw new Error('Erro ao atualizar job.');

      // Atualiza a lista de jobs localmente ou busca novamente os jobs
      setJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );

      setEditingJob(null); // Fecha o modal após a atualização
  } catch (err) {
      console.error('Error updating job:', err.message);
  }
};



  // Função para arquivar um job
const handleArchive = async (jobId) => {
  try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/archive/`, {
          method: 'PATCH',
      });
      
      if (!response.ok) throw new Error('Erro ao arquivar job.');

      // Redireciona para a página de jobs arquivados
      navigate('/archived-jobs'); // Redireciona após arquivar
  } catch (err) {
      console.error('Error archiving job:', err.message);
  }
};

  // Função para ordenar jobs por status
  const sortJobsByStatus = (jobs) => {
    const order = { pending: 1, approved: 2, rejected: 3 };
    return jobs.sort((a, b) => order[a.status] - order[b.status]);
  };

  // Renderiza conteúdo baseado no estado
  if (loading) return <div>Carregando jobs...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Ordena os jobs antes de renderizar
  const sortedJobs = sortJobsByStatus(jobs);

  return (
    <div className="job-list-container">
      <h1>Lista de Jobs</h1>
      <div className="job-list">
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={() => setEditingJob(job)}
            onArchive={() => handleArchive(job.id)} // Passa a função de arquivar para o JobCard
          />
        ))}
      </div>
      {editingJob && (
        <Modal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onUpdate={() => {/* Lógica para atualizar */}}
          onDelete={() => {/* Lógica para deletar */}} // Se você tiver essa funcionalidade
        />
      )}
    </div>
  );
};

export default JobList;
