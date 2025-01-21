// ArchivedJobList.js
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard'; 
import './ArchivedJobList.css'; 

const ArchivedJobList = () => {
  const [archivedJobs, setArchivedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os jobs arquivados
  useEffect(() => {
    const fetchArchivedJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/jobs/archived/');
        if (!response.ok) throw new Error('Erro ao carregar jobs arquivados.');
        
        const data = await response.json();
        setArchivedJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArchivedJobs();
  }, []);

  // Renderiza conteúdo baseado no estado
  if (loading) return <div>Carregando jobs arquivados...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="archived-job-list-container">
      <h1>Jobs Arquivados</h1>
      <div className="archived-job-list">
        {archivedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default ArchivedJobList;
