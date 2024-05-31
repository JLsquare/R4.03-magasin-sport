const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId, Decimal128 } = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://localhost:27017';
const dbName = 'sport_store';
let db;

// Connect to MongoDB
MongoClient.connect(url)
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.post('/articles', async (req, res) => {
  try {
    const article = {
      ...req.body,
      prix: Decimal128.fromString(req.body.prix),
      rayon_id: new ObjectId(req.body.rayon_id)
    };
    const result = await db.collection('articles').insertOne(article);
    res.send(result);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).send({ message: 'Error creating article', error });
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await db.collection('articles').aggregate([
      {
        $lookup: {
          from: 'rayons',
          localField: 'rayon_id',
          foreignField: '_id',
          as: 'rayon'
        }
      },
      { $unwind: '$rayon' }
    ]).toArray();
    res.send(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send({ message: 'Error fetching articles', error });
  }
});

app.get('/articles/:id', async (req, res) => {
  try {
    const article = await db.collection('articles').aggregate([
      { $match: { _id: new ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'rayons',
          localField: 'rayon_id',
          foreignField: '_id',
          as: 'rayon'
        }
      },
      { $unwind: '$rayon' }
    ]).toArray();
    res.send(article[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).send({ message: 'Error fetching article', error });
  }
});

app.put('/articles/:id', async (req, res) => {
  try {
    const updatedArticle = {
      ...req.body,
      prix: Decimal128.fromString(req.body.prix),
      rayon_id: new ObjectId(req.body.rayon_id)
    };
    const result = await db.collection('articles').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedArticle },
      { returnOriginal: false, returnDocument: 'after' }
    );
    res.status(200).send(result);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).send({ message: 'Error updating article', error });
  }
});

app.delete('/articles/:id', async (req, res) => {
  try {
    await db.collection('articles').deleteOne({ _id: new ObjectId(req.params.id) });
    res.send({ message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.send({ message: 'Error deleting article', error });
  }
});

app.post('/rayons', async (req, res) => {
  try {
    const rayon = req.body;
    const result = await db.collection('rayons').insertOne(rayon);
    res.send(result.ops[0]);
  } catch (error) {
    console.error('Error creating rayon:', error);
    res.status(500).send({ message: 'Error creating rayon', error });
  }
});

app.get('/rayons', async (req, res) => {
  try {
    const rayons = await db.collection('rayons').find().toArray();
    res.send(rayons);
  } catch (error) {
    console.error('Error fetching rayons:', error);
    res.status(500).send({ message: 'Error fetching rayons', error });
  }
});

app.get('/rayons/:id', async (req, res) => {
  try {
    const rayon = await db.collection('rayons').findOne({ _id: new ObjectId(req.params.id) });
    res.send(rayon);
  } catch (error) {
    console.error('Error fetching rayon:', error);
    res.status(500).send({ message: 'Error fetching rayon', error });
  }
});

app.put('/rayons/:id', async (req, res) => {
  try {
    const updatedRayon = { ...req.body };
    delete updatedRayon._id; // Remove _id to avoid updating the immutable field

    const result = await db.collection('rayons').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedRayon },
      { returnOriginal: false, returnDocument: 'after' } // Use returnDocument instead of returnOriginal
    );
    res.send(result);
  } catch (error) {
    console.error('Error updating rayon:', error);
    res.status(500).send({ message: 'Error updating rayon', error });
  }
});

app.delete('/rayons/:id', async (req, res) => {
  try {
    await db.collection('rayons').deleteOne({ _id: new ObjectId(req.params.id) });
    res.send({ message: 'Rayon deleted' });
  } catch (error) {
    console.error('Error deleting rayon:', error);
    res.status(500).send({ message: 'Error deleting rayon', error });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
