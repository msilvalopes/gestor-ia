const validateTask = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Title is required and must be a non-empty string'
    });
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({
      error: 'Description is required and must be a non-empty string'
    });
  }

  next();
};

module.exports = { validateTask };