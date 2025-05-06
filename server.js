const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // to parse JSON body

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CRUD', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Define a schema and model
const ItemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', ItemSchema);

// Create - POST /items
app.post('/items', async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

// Read - GET /items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// Update - PUT /items/:id
app.put('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.send(item);
});

// Delete - DELETE /items/:id
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
