import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';

const EditRayon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rayon, setRayon] = useState({
    description: '',
    employe_responsable: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/rayons/${id}`)
      .then(response => {
        setRayon(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rayon!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRayon(prevRayon => ({
      ...prevRayon,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/rayons/${id}`, rayon)
      .then(response => {
        console.log(response.data);
        navigate('/rayons');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Modifier un Rayon</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <div className="space-y-1">
          <p className="text-lg">
            Description
          </p>
          <input type="text" name="description" value={rayon.description} onChange={handleChange}
                 placeholder="Description" required className="w-full px-4 py-2 border rounded"/>
        </div>
        <div className="space-y-1">
          <p className="text-lg">
            Employé Responsable
          </p>
          <input type="text" name="employe_responsable" value={rayon.employe_responsable} onChange={handleChange}
                 placeholder="Employé Responsable" required className="w-full px-4 py-2 border rounded"/>
        </div>
        <div className="flex justify-between">
          <Link to={`/rayons`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Retour</button>
            </Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Modifier</button>
        </div>
      </form>
    </div>
  );
};

export default EditRayon;
