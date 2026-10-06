const express = require('express');
const router = express.Router();

// Mock data - em uma aplicação real, isso viria de um banco de dados
let tasks = [
  { id: 1, title: 'Tarefa 1', description: 'Descrição da tarefa 1', completed: false },
  { id: 2, title: 'Tarefa 2', description: 'Descrição da tarefa 2', completed: true },
  { id: 3, title: 'Tarefa 3', description: 'Descrição da tarefa 3', completed: false }
];

// GET /tasks - Listar todas as tarefas
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks
  });
});

module.exports = router;