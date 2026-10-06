const express = require('express');
const router = express.Router();

// Mock data - em uma aplicação real, isso viria de um banco de dados
let tasks = [
  { id: 1, title: 'Tarefa 1', description: 'Descrição da tarefa 1', completed: false },
  { id: 2, title: 'Tarefa 2', description: 'Descrição da tarefa 2', completed: true },
  { id: 3, title: 'Tarefa 3', description: 'Descrição da tarefa 3', completed: false }
];

// GET /tasks/:id - Buscar uma tarefa específica por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
  
  res.json(task);
});

module.exports = router;