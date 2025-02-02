import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import cors from 'cors';
import { tryManyTimesToGetData } from "./main.js";
import getIdLastJob from './checkIfNew.js'

const app = express();
const PORT = process.env.PORT || 8090

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.get('/health', (req, res) => {
    try {
        return res.status(200).send({ "Health": "Working" })
    } catch (error) {
        return res.status(400).send({ "Health": "Bad" })
    }
})

app.get('/run', async (req, res) => {
    try {
        let data = await tryManyTimesToGetData("", 0);
        return res.status(200).send({ "Data": data })
    } catch (error) {
        res.status(400).send({ "Error": "HOLA" })
    }
})

app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}/run`)
})

app.get('/automation', async (req, res) => {
    try {
        await getIdLastJob();
        return res.status(200).send({ "Action": "Email enviado" })
    } catch (error) {
        return res.status(400).send({ "Error": error })
    }
})