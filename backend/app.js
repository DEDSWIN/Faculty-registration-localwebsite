import express from 'express'
import cors from 'cors'

import { check_email, insertuser } from './register.js';
import { get_page1, insert_page1, get_user } from './page1.js';
import { get_page7, insert_page7 } from './page7.js';
import { insert_page8, get_page8 } from './page8.js';
import { get_page2, insert_page2 } from './page2.js';
import { get_page3, insert_page3 } from './page3.js';
import { get_page4, insert_page4 } from './page4.js';
import { get_page5, insert_page5 } from './page5.js';
import { get_page6, insert_page6 } from './page6.js';


const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

// for user register
app.get("/emailcheck", async (req, res) => {
    const result = await check_email(req.query.email);
    res.send(result);
})

app.post("/register", async (req, res) => {
    const { first, last, email, password, category } = req.body;
    const result = await insertuser(first, last, email, password, category);
    res.status(201).send(result);
})


// for page 1
app.post("/page1", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page1(email, data);
    res.status(201).send(result);
})

app.get("/page1", async (req, res) => {
    const result = await get_page1(req.query.email);
    res.status(201).send(result);
})
app.get("/page1/user", async (req, res) => {
    const result = await get_user(req.query.email);
    res.status(201).send(result);
})


// page1 end
// for page 2
app.post("/page2", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page2(email, data);
    res.status(201).send(result);
})

app.get("/page2", async (req, res) => {
    const result = await get_page2(req.query.email);
    res.status(201).send(result);
})

// page2 end
// for page 3
app.post("/page3", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page3(email, data);
    res.status(201).send(result);
})

app.get("/page3", async (req, res) => {
    const result = await get_page3(req.query.email);
    res.status(201).send(result);
})

// page3 end
// for page 4
app.post("/page4", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page4(email, data);
    res.status(201).send(result);
})

app.get("/page4", async (req, res) => {
    const result = await get_page4(req.query.email);
    res.status(201).send(result);
})

// 4 end
// for page 5
app.post("/page5", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page5(email, data);
    res.status(201).send(result);
})

app.get("/page5", async (req, res) => {
    const result = await get_page5(req.query.email);
    res.status(201).send(result);
})

// 5 end
// for page 6
app.post("/page6", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page6(email, data);
    res.status(201).send(result);
})

app.get("/page6", async (req, res) => {
    const result = await get_page6(req.query.email);
    res.status(201).send(result);
})

// 6 end

// for page 7
app.post("/page7", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page7(email, data);
    res.status(201).send(result);
})

app.get("/page7", async (req, res) => {
    const result = await get_page7(req.query.email);
    res.status(201).send(result);
})

// page7 end
// for page 8
app.post("/page8", async (req, res) => {
    const { email, data } = req.body;
    const result = await insert_page8(email, data);
    res.status(201).send(result);
})

app.get("/page8", async (req, res) => {
    const result = await get_page8(req.query.email);
    res.status(201).send(result);
})

// page8 end

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('something broke')
})

app.listen(8080, () => {
    console.log('server is running on port 8080')
})