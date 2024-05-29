import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page4(email, data) {
    const sql = `
        INSERT INTO page4(email, page4_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page4_data = VALUES(page4_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page4(email) {
    const [result] = await pool.query(`select * from page4 where email=?
`, [email]);
    return result;
}





