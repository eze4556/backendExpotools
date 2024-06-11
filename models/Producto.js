const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  precioFinal: { type: Number },
  precioDistribuidor: { type: Number },
  etiqueta: { type: String },
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
  marca: { type: Schema.Types.ObjectId, ref: 'Marca' },
  imagen: { type: String }
});

module.exports = mongoose.model('Producto', ProductoSchema);
