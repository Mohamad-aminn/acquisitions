import express from "express"
import chalk from "chalk"
import dotenv from "dotenv"

dotenv.config()

const app = express();

const port = process.env.PORT || 3000;

console.log(process.env.PORT)

app.get('/healthz', (req, res) => {
    res.send('ok').status(200)
})
app.get('/readyz', (req, res) => {
    res.send('ready').status(200)
})

app.listen(port, () => {
    console.log(chalk.blue(`Listening on port ${port}...`))
})