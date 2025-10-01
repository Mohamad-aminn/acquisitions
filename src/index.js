import chalk from 'chalk';
import app from './app.js';
import 'dotenv/config.js';
import logger from "./middleware/logger.js";

const port = process.env.PORT || 3000;
logger.error('testing!')
logger.info('testing!')
app.listen(port, () => {
  console.log(chalk.blue(`Listening on port ${port}...`));
});
