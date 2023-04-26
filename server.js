const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://prvnkkr:pravin123@cluster0.opm9mue.mongodb.net/todo?retrywrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Todo = require('./models/todo');

// Routes
app.get('/api/todo', (req, res) => {
  Todo.find()
    .then(todoList => res.json(todoList))
    .catch(err => console.log(err));
});

app.post('/api/todo', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    completed: false
  });

  newTodo.save()
    .then(todo => res.json(todo))
    .catch(err => console.log(err));
});
app.put('/api/todo/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(task => res.json(task))
    .catch(error => res.status(400).json(`Error: ${error}`));
});


// app.put('/api/todo/:id', (req, res) => {
//   Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed })
//     .then(() => res.json({ message: 'Task updated successfully' }))
//     .catch(err => console.log(err));
// });

app.delete('/api/todo/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Task deleted successfully' }))
    .catch(err => console.log(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
