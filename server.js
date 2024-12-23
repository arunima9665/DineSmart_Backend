const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// URIs for the different databases
const hotelsMongoURI = 'mongodb+srv://arunimabhatnagar9:iaisVRff0my2V2zk@cluster0.thttb.mongodb.net/dinesmart';
const menuMongoURI = 'mongodb+srv://arunimabhatnagar9:iaisVRff0my2V2zk@cluster0.thttb.mongodb.net/dinesmart';

app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// Connect to MongoDB for hotels
const hotelsConnection = mongoose.createConnection(hotelsMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB for menu
const menuConnection = mongoose.createConnection(menuMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schemas
const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
});

const menuSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  description: String,
});

// Define Models for both databases
const Hotel = hotelsConnection.model('Hotel', hotelSchema);
const Menu = menuConnection.model('Menu', menuSchema);

// Endpoint to fetch all hotels
app.get('/hotels', (req, res) => {
  Hotel.find()
    .then((hotels) => res.json(hotels))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching hotels');
    });
});

// Endpoint to fetch a specific hotel by name
app.get('/hotel/:name', (req, res) => {
  Hotel.findOne({ name: req.params.name })
    .then((hotel) => {
      if (hotel) {
        res.json(hotel);
      } else {
        res.status(404).send('Hotel not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching hotel');
    });
});

// Endpoint to fetch the menu
app.get('/menu', (req, res) => {
  Menu.find()
    .then((menuItems) => res.json(menuItems))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching menu');
    });
});

// Endpoint to fetch a specific menu item by name
app.get('/menu/:itemName', (req, res) => {
  Menu.findOne({ itemName: req.params.itemName })
    .then((menuItem) => {
      if (menuItem) {
        res.json(menuItem);
      } else {
        res.status(404).send('Menu item not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching menu item');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
