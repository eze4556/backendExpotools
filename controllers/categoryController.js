const Categoria = require('../models/Categoria');

exports.createCategory = async (req, res) => {
  try {
    const { id, nombre, imagen } = req.body;
    const newCategory = new Categoria({ id, nombre, imagen });
    await newCategory.save();
    res.status(201).json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error creando la categoría' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Categoria.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las categorías' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Categoria.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la categoría' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { nombre, imagen } = req.body;
    const category = await Categoria.findOneAndUpdate({ id: req.params.id }, { nombre, imagen }, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la categoría' });

  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Categoria.findOneAndDelete({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la categoría' });
  }
};
