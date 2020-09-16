//Import
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet'); /* Importation d'helmet, pour les failles xss  */

const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');

const path = require('path');
//const likeRoutes = require('./routes/like.js');

//création application Express
const app = express();


//Résolution erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Utilisation d'helmet
app.use(helmet());

//Parser les corps des requête + forcer parse d'objets inclus dans d'autres objets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;