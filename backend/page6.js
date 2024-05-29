import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page6(email, data) {
    const sql = `
        INSERT INTO page6(email, page6_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page6_data = VALUES(page6_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page6(email) {
    const [result] = await pool.query(`select * from page6 where email=?
`, [email]);
    return result;
}





