const express = require('express');
const router = express.Router();

// Mock data - em uma aplicação real, isso viria de um banco de dados
let tasks = [
  { id: 1, title: 'Tarefa 1', description: 'Descrição da tarefa 1', completed: false },
  { id: 2, title: 'Tarefa 2', description: 'Descrição da tarefa 2', completed: true }
];

let nextId = 3;

// POST /tasks - Criar nova tarefa
router.post('/', (req, res) => {
  const { title, description, completed } = req.body;
  
  // Validação de dados
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'O título é obrigatório e deve ser uma string não vazia'
    });
  }
  
  if (typeof description !== 'string') {
    return res.status(400).json({
      error: 'A descrição deve ser uma string'
    });
  }
  
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      error: 'O campo completed deve ser um valor booleano'
    });
  }
  
  // Criação da nova tarefa
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description || '',
    completed: completed === undefined ? false : completed
  };
  
  tasks.push(newTask);
  
  res.status(201).json(newTask);
});

module.exports = router;