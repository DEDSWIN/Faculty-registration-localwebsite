import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page5(email, data) {
    const sql = `
        INSERT INTO page5(email, page5_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page5_data = VALUES(page5_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page5(email) {
    const [result] = await pool.query(`select * from page5 where email=?
`, [email]);
    return result;
}





