import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import JobCard from './JobCard'; // Importando o novo componente JobCard
import './JobList.css'; // Importando o CSS para estilizar os cards

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/jobs/')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
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
    <div className="job-list-container">
      <h1>Jobs List</h1>
      <div className="job-list">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onEdit={() => setEditingJob(job)} />
        ))}
      </div>
      {editingJob && (
        <Modal job={editingJob} onClose={() => setEditingJob(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default JobList;
