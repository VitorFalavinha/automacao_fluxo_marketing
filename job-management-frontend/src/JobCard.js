// JobCard.js
import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onEdit, className }) => {
  return (
    <div className={`job-card ${className}`}>
      <h3>{job.title}</h3>
      <p><strong>Cliente:</strong> {job.client}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p>{job.description}</p>
      <button onClick={onEdit}>Editar</button>
    </div>
  );
};

export default JobCard;

