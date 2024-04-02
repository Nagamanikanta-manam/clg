const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://mani:Naga2002@cluster0.xzuzuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;

// Define a schema
const schema = new mongoose.Schema({
    reg:String,
    grade:String
});

// Define a model

const Model=new mongoose.model("regulation",schema)
// Middleware to parse JSON bodies
app.use(express.json());

// GET route to retrieve data from MongoDB
app.get('/data', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/data', async (req, res) => {
  const exampleData = new Model({
    reg: req.body.reg,
    grade: req.body.grade
  });

  try {
    const savedData = await exampleData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT =  3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
