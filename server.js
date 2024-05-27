const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

// to delete code
// Dummy database
let items = [{ id: 1, name: 'Item 1' }];

// GET all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// GET a single item by id
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.status(200).json(item);
});

// POST a new item
app.post('/items', (req, res) => {
  const item = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(item);
  res.status(201).send(item);
});

// PUT update an existing item
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = req.body.name; // Assuming request body contains 'name'
  res.status(200).send(item);
});

// DELETE an item
app.delete('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  const index = items.indexOf(item);
  items.splice(index, 1);
  res.status(204).send();
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

