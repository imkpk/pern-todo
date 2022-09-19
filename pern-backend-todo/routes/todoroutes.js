const express = require('express');
const router = express.Router();
const pool = require('../middleware/db');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const data = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(data.rows);
  } catch (error) {
    console.log(error, 'todo has an error');
  }
});

// get all todos
router.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get todo based on id
router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const singleTodo = await pool.query(
      'select * from todo where todo_id = $1',
      [id]
    );
    res.json(singleTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo

router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );

    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id
    ]);
    res.json('Todo was deleted!');
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
