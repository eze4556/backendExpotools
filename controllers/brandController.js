const Marca = require('../models/Marca');

exports.createBrand = async (req, res) => {
  try {
    const { id, nombre } = req.body;
    const newBrand = new Marca({ id, nombre });
    await newBrand.save();
    res.status(201).json({ message: 'Marca creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error creando la marca' });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Marca.find({});
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las marcas' });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await Marca.findOne({ id: req.params.id });
    if (!brand) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la marca' });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { nombre } = req.body;
    const brand = await Marca.findOneAndUpdate({ id: req.params.id }, { nombre }, { new: true });
    if (!brand) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la marca' });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Marca.findOneAndDelete({ id: req.params.id });
    if (!brand) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json({ message: 'Marca eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la marca' });
  }
};
