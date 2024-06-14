import {add, remove, getAll, getById, update} from './service.js';

export async function getAllPhotos(req, res) {
    const photos = await getAll();
    res.json(photos);
}

export async function getPhotoById(req, res) {
    const photo = await getById(req.params.id);
    res.json(photo);
}

export async function addPhoto(req, res) {
    console.log('req:', req.body);
    const { title, description, file } = req.body;
    const response = await add(title, description, file);
    console.log('response:', response);
    res.status(201);
}

export async function updatePhoto(req, res) {
    const { title, description, file } = req.body;
    const response = await update(req.params.id, title, description, file);
    console.log('response:', response);
    res.end()
}

export async function removePhoto(req, res) {
    const response = await remove(req.params.id);
    console.log('response:', response);
    res.end()
}