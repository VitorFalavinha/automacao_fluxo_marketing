import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import JobCard from './JobCard'; 
import './JobList.css'; 
import BackButton from './components/BackButton';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/jobs/')
      .then((response) => response.json())
      .then((data) => {
        // Ordena os jobs: pendentes primeiro, aprovados depois
        const sortedJobs = data.sort((a, b) => {
          if (a.status === 'pendente' && b.status === 'aprovado') return -1;
          if (a.status === 'aprovado' && b.status === 'pendente') return 1;
          return 0;
        });
        setJobs(sortedJobs);
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleUpdate = (updatedJob) => {
    fetch(`http://localhost:8000/api/jobs/${updatedJob.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedJob),
    })
      .then(response => response.json())
      .then(job => {
        const updatedJobs = jobs.map(j => (j.id === job.id ? job : j));
        setJobs(updatedJobs);
        setEditingJob(null); // Fecha o modal após a atualização
      })
      .catch(error => console.error('Error updating job:', error));
  };

  return (
    <div>
      <BackButton /> {}
      <div className="job-list-container">
        <h1>Jobs List</h1>
        <div className="job-list">
          {jobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onEdit={() => setEditingJob(job)} 
              className={
                job.status === 'pending' ? 'bg-pending' : job.status === 'approved' ? 'bg-approved' : 'bg-rejected'
              } 
            />
          ))}
        </div>
        {editingJob && (
          <Modal job={editingJob} onClose={() => setEditingJob(null)} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default JobList;
