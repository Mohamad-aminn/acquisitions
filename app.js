import express from "express"
import chalk from "chalk"
import "./configs/config.js"
import route from "./routes/k8s.js";

const app = express();

const port = process.env.PORT || 3000;

app.use('/', route);

app.listen(port, () => {
    console.log(chalk.blue(`Listening on port ${port}...`))
})