import React, { useState, useEffect } from 'react';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import GrievanceForm from './components/GrievanceForm/GrievanceForm';
import MusicToggle from './components/MusicToggle/MusicToggle';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);
  }, []);

  const handleComplaintSubmit = (newComplaint) => {
    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
  };

  return (
    <div className="App">
      
      {!showForm ? (
        <Welcome onStart={() => setShowForm(true)} />
      ) : (
        <GrievanceForm 
          onComplaintSubmit={handleComplaintSubmit} 
          onBack={() => setShowForm(false)}
        />
      )}
      <MusicToggle />
    </div>
  );
}

export default App;

