const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ObjectId} = require("mongodb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://localhost:27017';
const dbName = 'sport_store';

mongoose.connect(`${url}/${dbName}`);

const ArticleSchema = new mongoose.Schema({
  marque: { type: String, required: true },
  prix: { type: mongoose.Schema.Types.Decimal128, required: true },
  nom: { type: String, required: true },
  reference: { type: String, required: true },
  categorie: { type: String, enum: ["enfant", "junior", "senior"], required: false },
  tailles: { type: [Number], required: false },
  fournisseur: {
    nom: { type: String, required: true },
    adresse: { type: String, required: true }
  },
  rayon_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const RayonSchema = new mongoose.Schema({
  description: { type: String, required: true },
  employe_responsable: { type: String, required: true }
});

const Article = mongoose.model('Article', ArticleSchema);
const Rayon = mongoose.model('Rayon', RayonSchema);

app.post('/articles', async (req, res) => {
    req.body.prix = new mongoose.Types.Decimal128(req.body.prix);
    req.body.rayon_id = new mongoose.Types.ObjectId(req.body.rayon_id);
    const article = new Article(req.body);
    await article.save();
    res.send(article);
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.aggregate([
      {
        $lookup: {
          from: 'rayons',
          localField: 'rayon_id',
          foreignField: '_id',
          as: 'rayon'
        }
      },
      {
        $unwind: '$rayon'
      }
    ]);
    res.send(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send({ message: 'Error fetching articles', error });
  }
});

app.get('/articles/:id', async (req, res) => {
    try {
        const article = await Article.aggregate([
        {
            $match: {
            _id: new ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
            from: 'rayons',
            localField: 'rayon_id',
            foreignField: '_id',
            as: 'rayon'
            }
        },
        {
            $unwind: '$rayon'
        }
        ]);
        res.send(article[0]);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).send({ message: 'Error fetching article', error });
    }
});

app.put('/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(article);
});

app.delete('/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({ message: 'Article deleted' });
});

app.post('/rayons', async (req, res) => {
  const rayon = new Rayon(req.body);
  await rayon.save();
  res.send(rayon);
});

app.get('/rayons', async (req, res) => {
  const rayons = await Rayon.find();
  res.send(rayons);
});

app.get('/rayons/:id', async (req, res) => {
  const rayon = await Rayon.findById(req.params.id);
  res.send(rayon);
});

app.put('/rayons/:id', async (req, res) => {
  const rayon = await Rayon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(rayon);
});

app.delete('/rayons/:id', async (req, res) => {
  await Rayon.findByIdAndDelete(req.params.id);
  res.send({ message: 'Rayon deleted' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});