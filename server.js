
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// Connect to MongoDB for menu
const menuConnection = mongoose.createConnection('mongodb+srv://arunima0911:harshwardhan@dinenow.rvnozsc.mongodb.net/menulist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Menu schema and model
const MenuSchema = new mongoose.Schema({
  Name: String,
  Price: Number,
  Category: String
});

const Menu = menuConnection.model('Menu', MenuSchema);

// Route for dynamic menu page
app.get('/menuList', (req, res) => {
  Menu.find()
    .then(menu => res.json(menu))  // Use the correct variable name 'menu' here
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching data');
    });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});