import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import cors from 'cors';
import { tryManyTimesToGetData } from "./main.js";

const app = express();
const PORT = 8090

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.get('/run', async (req, res) => {
    let url = "https://www.upwork.com/nx/search/jobs/?nbs=1&q=appsheet"
    try {
        let data = await tryManyTimesToGetData(url, 0);
        return res.status(200).send({ "Data": data })
    } catch (error) {
        res.status(400).send({ "Error": "HOLA" })
    }
})

app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}/run`)
})