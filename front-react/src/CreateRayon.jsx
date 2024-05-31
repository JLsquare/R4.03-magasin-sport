// src/components/CreateRayon.js
import { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const CreateRayon = () => {
  const [rayon, setRayon] = useState({
    description: '',
    employe_responsable: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRayon(prevRayon => ({
      ...prevRayon,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/rayons', rayon)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Créer un Rayon</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <input type="text" name="description" value={rayon.description} onChange={handleChange} placeholder="Description" required className="w-full px-4 py-2 border rounded" />
        <input type="text" name="employe_responsable" value={rayon.employe_responsable} onChange={handleChange} placeholder="Employé Responsable" required className="w-full px-4 py-2 border rounded" />
        <div className="flex justify-between">
          <Link to="/rayons">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Retour</button>
          </Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Créer</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRayon;
