import 'dotenv/config';
import express, { Request, Response } from 'express';

const app = express();
const PORT: number = Number(process.env.PORT) || 3333;

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});
