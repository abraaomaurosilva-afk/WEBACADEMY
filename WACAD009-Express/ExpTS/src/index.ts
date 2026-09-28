import 'dotenv/config';
import express from 'express';
import { accessLogger } from './middlewares/accessLogger';
import routes from './routes';
import { validateEnv } from './utils/validateEnv';

validateEnv();

const app = express();
const PORT: number = Number(process.env.PORT);

app.use(accessLogger('completo'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`);
});
