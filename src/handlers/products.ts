import { Product, ProductStore } from '../models/productUnit';
import { Application, Request, Response } from 'express';
import { verifyingTheToken } from './helpers';

const productStores = new ProductStore();

const gettingTheProducts = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await productStores.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteTheProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send(`<!DOCTYPE html>
      <html>
      <head>
      <style>
      body{
          display: grid;
          text-align: center;
          text-justify: center;
          align-items: center;
          background-color: black;
      }
      p {
        font-size: 1.5em;
      }
      div {
        border-left: 9px solid blue;
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        padding: 20px;
        display: grid;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      </style>
      </head>
      <body>
      <div>
      <h1> Sorry, Ther's Some Thing Wrong </h1>
      <p>The parameter :id are required</p>
      </div>
      </body>
      </html>`);
      return false;
    }
    await productStores.deleteTheProduct(id);
    res.send(`<!DOCTYPE html>
    <html>
    <head>
    <style>
    body{
        display: grid;
        text-align: center;
        text-justify: center;
        align-items: center;
        background-color: black;
    }
    p {
      font-size: 1.5em;
    }
    div {
      border-left: 9px solid blue;
      background-color: #4158D0;
      background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
      padding: 20px;
      display: grid;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    </style>
    </head>
    <body>
    <div>
    <h1> Sorry, Ther's Some Thing Wrong </h1>
    <p> Order ID ${id} Hase Been Deleted Successfully</p>
    </div>
    </body>
    </html>`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    if (!name || !price) {
      res.status(400);
      res.send(`<!DOCTYPE html>
      <html>
      <head>
      <style>
      body{
          display: grid;
          text-align: center;
          text-justify: center;
          align-items: center;
          background-color: black;
      }
      p {
        font-size: 1.5em;
      }
      div {
        border-left: 9px solid blue;
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        padding: 20px;
        display: grid;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      </style>
      </head>
      <body>
      <div>
      <h1> Sorry, Ther's Some Thing Wrong </h1>
      <p>Ther's Some Thing Are Missing</p>
      </div>
      </body>
      </html>`);
      return false;
    }
    const product: Product = await productStores.create({ name, price });
    res.json({
      product,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    if (!name || !price || !id) {
      res.status(400);
      res.send(`<!DOCTYPE html>
      <html>
      <head>
      <style>
      body{
          display: grid;
          text-align: center;
          text-justify: center;
          align-items: center;
          background-color: black;
      }
      p {
        font-size: 1.5em;
      }
      div {
        border-left: 9px solid blue;
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        padding: 20px;
        display: grid;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      </style>
      </head>
      <body>
      <div>
      <h1> Sorry, Ther's Some Thing Wrong </h1>
      <p> Ther's Some parameters are missing</p>
      </div>
      </body>
      </html>`);
      return false;
    }
    const product: Product = await productStores.update(id, {
      name,
      price,
    });
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const readingTheProcuts = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send(`<!DOCTYPE html>
      <html>
      <head>
      <style>
      body{
          display: grid;
          text-align: center;
          text-justify: center;
          align-items: center;
          background-color: black;
      }
      p {
        font-size: 1.5em;
      }
      div {
        border-left: 9px solid blue;
        background-color: #4158D0;
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
        padding: 20px;
        display: grid;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      </style>
      </head>
      <body>
      <div>
      <h1> Sorry, Ther's Some Thing Wrong </h1>
      <p>The parameter :id are required</p>
      </div>
      </body>
      </html>`);
      return false;
    }
    const product: Product = await productStores.read(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: Application) => {
  app.delete('/productsroutes/:id', verifyingTheToken, deleteTheProduct);
  app.post('/productsroutes/create', verifyingTheToken, create);
  app.put('/productsroutes/:id', verifyingTheToken, update);
  app.get('/productsroutes/:id', readingTheProcuts); 
  app.get('/productsroutes', gettingTheProducts);
};

export default productRoutes;