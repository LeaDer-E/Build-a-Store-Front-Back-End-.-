import express, { Application, Request, Response } from 'express';
import routesOfProducts from './handlers/products';
import routesOfOrders from './handlers/orders';
import routesOfUsers from './handlers/users';
import bodyParser from 'body-parser';
import path from 'path';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = 6001;

if (process.env.ENV === 'test') {
  port = 3001;
}

app.get('/', (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, '../Storefront-Project.html'));
});

routesOfProducts(app);
routesOfOrders(app);
routesOfUsers(app);

const url: string = `\x1b[35mhttp://localhost:${port}\x1b[0m`;

app.listen(
  port,
  async (): Promise<void> => {
    console.log(`Server Running at: ${url} Hope U Like it ;)`);
  }
);

export default app;