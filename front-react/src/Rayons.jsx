// src/components/Rayons.js
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Rayons = () => {
  const [rayons, setRayons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/rayons')
      .then(response => {
        setRayons(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rayons!', error);
      });
  }, []);

  const deleteRayon = (id) => {
    axios.delete(`http://localhost:3000/rayons/${id}`)
      .then(() => {
        setRayons(rayons.filter(rayon => rayon._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the rayon!', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Rayons</h1>
      <Link to="/create-rayon">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
          Créer un nouveau rayon
        </button>
      </Link>
      <ul>
        {rayons.map(rayon => (
          <li key={rayon._id} className="border p-4 mb-2 rounded space-y-4 w-96">
            <div className="space-y-1">
              <p><strong>Description:</strong> {rayon.description}</p>
              <p><strong>Employé Responsable:</strong> {rayon.employe_responsable}</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => deleteRayon(rayon._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700">
                Supprimer
              </button>
              <Link to={`/edit-rayon/${rayon._id}`}>
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700">
                  Modifier
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rayons;
