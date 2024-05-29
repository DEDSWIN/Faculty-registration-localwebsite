import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page7(email, data) {
    const sql = `
        INSERT INTO page7(email, page7_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page7_data = VALUES(page7_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page7(email) {
    const [result] = await pool.query(`select * from page7 where email=?
`, [email]);
    return result;
}





