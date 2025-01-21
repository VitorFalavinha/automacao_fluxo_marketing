// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import JobList from './JobList';
import JobForm from './JobForm'; // Componente para criação de novo job
import ArchivedJobList from './ArchivedJobList'; // Importa o novo componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/create-job" element={<JobForm />} />
        <Route path="/archived-jobs" element={<ArchivedJobList />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
};

export default App;
