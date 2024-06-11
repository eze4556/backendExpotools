const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcaSchema = new Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Marca', MarcaSchema);
