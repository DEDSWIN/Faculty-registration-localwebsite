import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page8(email, data) {
    const sql = `
        INSERT INTO page8(email, page8_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page8_data = VALUES(page8_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page8(email) {
    const [result] = await pool.query(`select * from page8 where email=?
`, [email]);
    return result;
}





