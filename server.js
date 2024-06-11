const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productos');
const brandRoutes = require('./routes/marcas');
const userRoutes = require('./routes/usuarios');
const categoryRoutes = require('./routes/categoria');


const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/expotools')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



// Rutas
app.use('/products', productRoutes);
app.use('/brands', brandRoutes);
app.use('/users', userRoutes);
app.use('/categorias', categoryRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
