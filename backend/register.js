import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'faculty_reg'
}).promise()



// chek email

export async function check_email(email) {
    console.log(email);
    const [result] = await pool.query(`SELECT count(*) as count FROM users WHERE email = 'gotham@gmail.com';`, [email]);
    return result;
}
// get application number

export async function application_no() {
    const [result] = await pool.query(`select * from users order by application_id desc limit 1;`);
    return result;
}



// insert into user

export async function insertuser(first, last, email, passwd, category) {
    const appno = await application_no();
    const [result] = await pool.query(`INSERT INTO users (first_name, last_name, email, password, category, application_id)
VALUES (?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE 
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    password = VALUES(password),
    category = VALUES(category),
    application_id = VALUES(application_id);

`, [first, last, email, passwd, category, appno[0].application_id + 1]);
    console.log(result);
    return result;
}



