// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import JobList from './JobList';
import JobForm from './JobForm'; // Componente para criação de novo job

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/create-job" element={<JobForm />} />
      </Routes>
    </Router>
  );
};

export default App;
