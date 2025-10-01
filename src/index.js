import chalk from 'chalk';
import app from './app.js';
import 'dotenv/config.js';
import logger from "#configs/logger.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(chalk.blue(`Listening on port ${port}...`));
});
