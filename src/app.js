require('dotenv').config({ path: '../.env' });

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const userRoutes = require('./api/routes/userRoutes');
const postRoutes = require('./api/routes/postRoutes');
const serviceRoutes = require('./api/routes/serviceRoutes');


app.use(helmet());
app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Yo Baddies API!');
});

app.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
