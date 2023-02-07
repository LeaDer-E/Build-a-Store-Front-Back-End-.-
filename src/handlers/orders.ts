import { Order, OrderProduct, OrderStore } from '../models/orderUnit';
import { Application, Request, Response } from 'express';
import { verifyingTheToken } from './helpers';

const OrderStores = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders: Order[] = await OrderStores.getOrder();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  };
};

const readingTheOrder = async (req: Request, res: Response) => {
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
    const order: Order = await OrderStores.read(id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteTheOrder = async (req: Request, res: Response) => {
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
    await OrderStores.deleteTheOrder(id);
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
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;
    if (!products || !status || !user_id) {
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
    };
    const order: Order = await OrderStores.create({
      products,
      status,
      user_id,
    });
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;
    if (!products || !status || !user_id || !id) {
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
    const order: Order = await OrderStores.update(id, {
      products,
      status,
      user_id,
    });
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: Application) => {
  app.delete('/ordersroutes/:id', verifyingTheToken, deleteTheOrder);
  app.get('/ordersroutes/:id', verifyingTheToken, readingTheOrder);
  app.post('/ordersroutes/create', verifyingTheToken, create);
  app.put('/ordersroutes/:id', verifyingTheToken, update);
  app.get('/ordersroutes', index);
}

export default orderRoutes;