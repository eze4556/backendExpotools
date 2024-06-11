const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  imagen: { type: String }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
