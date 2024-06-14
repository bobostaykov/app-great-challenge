import pool from "./database.js";

export async function getAll() {
    const response = await pool.query('SELECT * FROM photos');
    console.log("response:", response);
    return response.rows;
}

export async function getById(id) {
    const response = await pool.query('SELECT * FROM photos WHERE id = $1', [id]);
    return response.rows[0];
}

export async function add(title, description, file) {
    console.log("title:", title);
    console.log("description:", description);
    console.log("file:", file);
    const response = await pool.query('INSERT INTO photos (title, description, file) VALUES ($1, $2, $3)', [title, description, file]);
    return response;
}

export async function update(id, title, description, file) {
    const response = await pool.query('UPDATE photos SET title = $2, description = $3, file = $4 WHERE id = $1', [it, title, description, file]);
    return response;
}

export async function remove(id) {
    const response = await pool.query('DELETE FROM photos WHERE id = $1', [id]);
    return response;
}