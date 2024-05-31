import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Articles from './Articles';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import CreateRayon from './CreateRayon';
import EditRayon from './EditRayon';
import Rayons from './Rayons';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-16">
        <Link to="/">
          <h1 className="text-4xl font-bold mb-8">Gestion du Magasin de Sport</h1>
        </Link>
        <div className="flex space-x-4 mb-8">
          <Link to="/articles">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Articles
            </button>
          </Link>
          <Link to="/rayons">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Rayons
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit-article/:id" element={<EditArticle />} />
          <Route path="/create-rayon" element={<CreateRayon />} />
          <Route path="/edit-rayon/:id" element={<EditRayon />} />
          <Route path="/rayons" element={<Rayons />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
