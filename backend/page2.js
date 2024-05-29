import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// insert into user

export async function insert_page2(email, data) {
    const sql = `
        INSERT INTO page2(email, page2_data) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE page2_data = VALUES(page2_data)
    `;
    const [result] = await pool.query(sql, [email, JSON.stringify(data)]);
    return result;
}

export async function get_page2(email) {
    const [result] = await pool.query(`select * from page2 where email=?
`, [email]);
    return result;
}





