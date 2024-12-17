import React from "react";
import "./JobCard.css";

const JobCard = ({ job, onEdit }) => {
  const getClassByStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-pending";
      case "approved":
        return "bg-approved";
      case "rejected":
        return "bg-rejected";
      default:
        return "";
    }
  };

  return (
    <div className={`job-card ${getClassByStatus(job.status)}`}>
      <h3>{job.title}</h3>
      <p><strong>Cliente:</strong> {job.client}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Descrição:</strong> {job.description}</p>
      <p><strong>WhatsApp:</strong> {job.whatsapp_number}</p>
      <p><strong>Email:</strong> {job.email}</p>
      {job.link && (
        <div>
          {job.link.endsWith(".jpg") || job.link.endsWith(".png") || job.link.endsWith(".jpeg") ? (
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              <img
                src={job.link}
                alt="Preview"
                style={{ maxWidth: "100px", borderRadius: "5px" }}
              />
            </a>
          ) : (
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              Abrir arquivo
            </a>
          )}
        </div>
      )}
      <button onClick={onEdit}>Editar</button>
    </div>
  );
};

export default JobCard;
