import express from "express";

const route = express.Router();

route.get('/healthz', (req, res) => {
    res.send('ok').status(200)
})
route.get('/readyz', (req, res) => {
    res.send('ready').status(200)
})

export default route;