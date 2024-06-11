const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registerUser = async (req, res) => {
  try {
    const { uid, email, nombre, apellido, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usuario({ uid, email, nombre, apellido, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error registrando el usuario' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ uid: user.uid }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error iniciando sesión' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Usuario.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Usuario.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Usuario.findOneAndDelete({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando el usuario' });
  }
};
