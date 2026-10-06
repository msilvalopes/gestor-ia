const express = require('express');
const router = express.Router();

// Mock data - em uma aplicação real, isso viria de um banco de dados
let tasks = [
  { id: 1, title: 'Tarefa 1', completed: false },
  { id: 2, title: 'Tarefa 2', completed: true },
  { id: 3, title: 'Tarefa 3', completed: false }
];

// GET /tasks - Obter todas as tarefas
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Obter uma tarefa específica
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  
  res.json(task);
});

// POST /tasks - Criar uma nova tarefa
router.post('/', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }
  
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    completed: false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Atualizar uma tarefa específica
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  
  const { title, completed } = req.body;
  
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Excluir uma tarefa específica
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ message: 'Tarefa excluída com sucesso', task: deletedTask });
});

module.exports = router;