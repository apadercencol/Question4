const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const db = 'mongodb+srv://apader:123456789Allen!@cluster0.wcjio3u.mongodb.net/marketplace?retryWrites=true&w=majority';

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const productRoutes = require('./routes/productRoutes');

app.use('/', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the DressStore application." });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
