const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');
const bukuRoutes = require('./routes/buku.routes');
const koleksiRoutes = require('./routes/koleksi.routes');
const kategoriRoutes = require('./routes/kategori.routes');
const reviewRoutes = require('./routes/review.routes');
const peminjamanRoutes = require('./routes/peminjaman.routes');

const databaseConfig = require('./config/db.config');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(databaseConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Failed to connnect", err));

app.use('/auth', authRoutes);
app.use('/buku', bukuRoutes);
app.use('/koleksi', koleksiRoutes);
app.use('/kategori', kategoriRoutes);
app.use('/review', reviewRoutes);
app.use('/peminjaman', peminjamanRoutes);

app.listen(PORT, () => {
    console.log(`Program running on PORT ${PORT}`)
});