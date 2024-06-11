const Producto = require('../models/Producto');

exports.createProduct = async (req, res) => {
  try {
    const { id, nombre, descripción, precio, precio_final, precio_distribuidor, etiqueta, categoría, marca, imagen } = req.body;
    const newProduct = new Producto({ id, nombre, descripción, precio, precio_final, precio_distribuidor, etiqueta, categoría, marca, imagen });
    await newProduct.save();
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error creando el producto' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Producto.find({}).populate('categoría').populate('marca');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los productos' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Producto.findOne({ id: req.params.id }).populate('categoría').populate('marca');
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nombre, descripción, precio, precio_final, precio_distribuidor, etiqueta, categoría, marca, imagen } = req.body;
    const product = await Producto.findOneAndUpdate({ id: req.params.id }, { nombre, descripción, precio, precio_final, precio_distribuidor, etiqueta, categoría, marca, imagen }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Producto.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando el producto' });
  }
};
