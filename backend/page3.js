import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page3(email, data) {
    const sql = `
        INSERT INTO page3(email, page3_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page3_data = VALUES(page3_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page3(email) {
    const [result] = await pool.query(`select * from page3 where email=?
`, [email]);
    return result;
}





