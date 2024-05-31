import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  }, []);

  const deleteArticle = (id) => {
    axios.delete(`http://localhost:3000/articles/${id}`)
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the article!', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <Link to="/create-article">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
          Créer un nouvel article
        </button>
      </Link>
      <ul>
        {articles.map(article => (
          <li key={article._id} className="border p-4 mb-2 rounded space-y-4 w-96">
            <div className="space-y-1">
              <p><strong>Nom:</strong> {article.nom}</p>
              <p><strong>Marque:</strong> {article.marque}</p>
              <p><strong>Prix:</strong> {parseFloat(article.prix.$numberDecimal)}</p>
              <p><strong>Référence:</strong> {article.reference}</p>
              {article.categories && (
                <p><strong>Catégorie:</strong> {article.categorie}</p>
              )}
              {article.tailles && (
                <p><strong>Tailles:</strong> {article.tailles.join(', ')}</p>
              )}
              <p><strong>Fournisseur:</strong> {article.fournisseur.nom}, {article.fournisseur.adresse}</p>
              <p><strong>Description du Rayon:</strong> {article.rayon.description}</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => deleteArticle(article._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700">
                Supprimer
              </button>
              <Link to={`/edit-article/${article._id}`}>
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

export default Articles;
