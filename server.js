const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI for the dinesmart database
const mongoURI = 'mongodb+srv://arunimabhatnagar9:iaisVRff0my2V2zk@cluster0.thttb.mongodb.net/dinesmart';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Define Schemas
const hotelSchema = new mongoose.Schema({
  name: String,
  rating: Number,
});

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

// Define Models for the collections
const Hotel = mongoose.model('Hotel', hotelSchema);
const Menu = mongoose.model('Menu', menuSchema);

// Endpoint to fetch all hotels
app.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).send('Error fetching hotels');
  }
});

// Endpoint to fetch a specific hotel by name
app.get('/hotel/:name', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ name: req.params.name });
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).send('Hotel not found');
    }
  } catch (err) {
    console.error('Error fetching hotel:', err);
    res.status(500).send('Error fetching hotel');
  }
});

// Endpoint to fetch all menu items
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).send('Error fetching menu');
  }
});

// Endpoint to fetch a specific menu item by name
app.get('/menu/:name', async (req, res) => {
  try {
    const menuItem = await Menu.findOne({ name: req.params.name });
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    console.error('Error fetching menu item:', err);
    res.status(500).send('Error fetching menu item');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
