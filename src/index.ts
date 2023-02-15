import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import { ProductRoutes } from './packages/routes/product.route';
import routes from './packages/routes';
dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api/v1/products', routes.products);

app.listen(port, () => {
  console.log(`MainStack E-commerce API listening on port ${port}!`);
});
