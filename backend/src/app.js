import express from 'express';
import dotenv from 'dotenv';
import pool from './database.js';
import {addPhoto, removePhoto, getAllPhotos, getPhotoById, updatePhoto} from './controller.js';

dotenv.config();

const PORT = 3001;

const app = express()
const router = express.Router();

router.get('/photos', getAllPhotos);
router.get('/photos/:id', getPhotoById);
router.post('/photos', addPhoto);
router.put('/photos/:id', updatePhoto);
router.delete('/photos/:id', removePhoto);

app.use(express.json());
app.use('/', router);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const createPhotoTable = `
  CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(500),
    file BYTEA
  );
`;

pool.query(createPhotoTable)
    .then(() => console.log('DB table created'))
    .catch((e) => console.error('Error while creating table:', e));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});