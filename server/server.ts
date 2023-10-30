import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 