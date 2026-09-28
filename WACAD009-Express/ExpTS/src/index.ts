import 'dotenv/config';
import express, { Request, Response } from 'express';
import { validateEnv } from './utils/validateEnv';

validateEnv();

const app = express();
const PORT: number = Number(process.env.PORT);

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});
