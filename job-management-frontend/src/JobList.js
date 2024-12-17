import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import JobCard from './JobCard'; 
import './JobList.css'; 
import BackButton from './components/BackButton';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os jobs e ordena por status
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/jobs/');
        if (!response.ok) throw new Error('Erro ao carregar jobs.');
        
        const data = await response.json();
        const sortedJobs = data.sort((a, b) => {
          const order = { pending: 1, approved: 2, rejected: 0 };
          return order[a.status] - order[b.status];
        });
        setJobs(sortedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Atualiza job na API e no estado local
  const handleUpdate = async (updatedJob) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${updatedJob.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });
      if (!response.ok) throw new Error('Erro ao atualizar job.');

      const job = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === job.id ? job : j))
      );
      setEditingJob(null); // Fecha o modal
    } catch (err) {
      console.error('Error updating job:', err.message);
    }
  };

  // Exclui job na API e no estado local
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar job.');

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      setEditingJob(null); // Fecha o modal se estava aberto
    } catch (err) {
      console.error('Error deleting job:', err.message);
    }
  };

  // Renderiza conteúdo baseado no estado
  if (loading) return <div>Carregando jobs...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <BackButton />
      <div className="job-list-container">
        <h1>Lista de Jobs</h1>
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={() => setEditingJob(job)}
              className={
                job.status === 'pending' 
                  ? 'bg-pending' 
                  : job.status === 'approved' 
                  ? 'bg-approved' 
                  : 'bg-rejected'
              }
            />
          ))}
        </div>
        {editingJob && (
          <Modal
            job={editingJob}
            onClose={() => setEditingJob(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete} // Passa a função de exclusão para o modal
          />
        )}
      </div>
    </div>
  );
};

export default JobList;
