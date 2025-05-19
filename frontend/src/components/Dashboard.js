import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [subdivisions, setSubdivisions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/subdivisions').then(res => setSubdivisions(res.data));
  }, []);

  return (
    <div>
      <h2>Your Subdivisions</h2>
      <ul>
        {subdivisions.map(s => <li key={s.id}>{s.name}</li>)}
      </ul>
    </div>
  );
}

export default Dashboard;

