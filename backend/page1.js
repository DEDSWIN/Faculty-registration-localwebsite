import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page1(email, data) {
    const sql = `
        INSERT INTO page1(email, page1_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page1_data = VALUES(page1_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page1(email) {
    const [result] = await pool.query(`select * from page1 where email=?
`, [email]);
    return result;
}

export async function get_user(email) {
    const [result] = await pool.query(`select * from users where email=?
`, [email]);
    return result;
}








