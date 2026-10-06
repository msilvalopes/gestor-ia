class Task {
  constructor(id, title, description, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}

// Armazenamento em memória para tarefas
let tasks = [];
let nextId = 1;

const TaskModel = {
  findAll: () => {
    return tasks;
  },

  findById: (id) => {
    return tasks.find(task => task.id === id);
  },

  create: (taskData) => {
    const newTask = new Task(nextId, taskData.title, taskData.description);
    tasks.push(newTask);
    nextId++;
    return newTask;
  },

  update: (id, taskData) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData };
      return tasks[index];
    }
    return null;
  },

  delete: (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    return false;
  },

  // Método para resetar o banco de dados (útil para testes)
  reset: () => {
    tasks = [];
    nextId = 1;
  }
};

module.exports = TaskModel;