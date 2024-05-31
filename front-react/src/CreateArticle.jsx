import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateArticle = () => {
  const [article, setArticle] = useState({
    marque: '',
    prix: '',
    nom: '',
    reference: '',
    categorie: '',
    tailles: '',
    fournisseur: { nom: '', adresse: '' },
    rayon_id: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevArticle => ({
      ...prevArticle,
      [name]: value
    }));
  };

  const handleFournisseurChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevArticle => ({
      ...prevArticle,
      fournisseur: {
        ...prevArticle.fournisseur,
        [name]: value
      }
    }));
  };

  const handleRayonChange = (e) => {
    setArticle(prevArticle => ({
      ...prevArticle,
      rayon_id: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/articles', {
      ...article,
      prix: parseFloat(article.prix),
      tailles: article.tailles.split(',').map(size => parseInt(size))
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Créer un Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <div className="space-y-1">
          <p className="text-lg">Marque</p>
          <input type="text" name="marque" value={article.marque} onChange={handleChange} placeholder="Marque" required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Prix</p>
          <input type="number" name="prix" value={article.prix} onChange={handleChange} placeholder="Prix" required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Nom</p>
          <input type="text" name="nom" value={article.nom} onChange={handleChange} placeholder="Nom" required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Référence</p>
          <input type="text" name="reference" value={article.reference} onChange={handleChange} placeholder="Référence" required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Catégorie</p>
          <select name="categorie" value={article.categorie} onChange={handleChange} className="w-full px-4 py-2 border rounded">
            <option value="">Sélectionnez une catégorie</option>
            <option value="enfant">Enfant</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="space-y-1">
          <p className="text-lg">Tailles (séparées par des virgules)</p>
          <input type="text" name="tailles" value={article.tailles} onChange={handleChange} placeholder="Tailles (séparées par des virgules)" className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Nom du Fournisseur</p>
          <input type="text" name="nom" value={article.fournisseur.nom} onChange={handleFournisseurChange} placeholder="Nom du Fournisseur" required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Adresse du Fournisseur</p>
          <input type="text" name="Adresse" value={article.fournisseur.adresse} onChange={handleFournisseurChange} placeholder="Adresse du Fournisseur" required className="w-full px-4 py-2 border rounded" />
        </div>
        <div className="space-y-1">
          <p className="text-lg">Rayon</p>
          <select name="rayon_id" value={article.rayon_id} onChange={handleRayonChange} required className="w-full px-4 py-2 border rounded">
            <option value="">Sélectionnez un rayon</option>
            {rayons.map(rayon => (
              <option key={rayon._id} value={rayon._id}>{rayon.description}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <Link to={'/articles'}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Retour</button>
          </Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Créer</button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
