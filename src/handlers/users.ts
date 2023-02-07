import { verifyingTheToken, gettingTheTokenFromUser } from './helpers';
import { Application, Request, Response } from 'express';
import { User, UserStore } from '../models/userUnit';

const userStores = new UserStore();

const authenticate = async (req: Request, res: Response) => {
  try {
    const username = (req.body.username as unknown as string) || 'EslamMustafa';
    const password = (req.body.password as unknown as string) || 'password123';
    if (!username || !password) {
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
      <p>The parameter Username & Password are required</p>
      </div>
      </body>
      </html>`);
      return false;
    }
    const user: User | null = await userStores.authenticate(username, password);
    if (!user) {
      return res.status(401);
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
      <p>Access Denied, Incorrect Password For ${username}</p>
      </div>
      </body>
      </html>`);
    }
    res.json(gettingTheTokenFromUser(user));
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await userStores.getUser();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteTheUser = async (req: Request, res: Response) => {
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
      <p> The ID Parameter are Missing</p>
      </div>
      </body>
      </html>`);
      return false;
    }
    await userStores.deleteTheUser(id);
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
    <p> User With ID: ${id} Hase Been Successfully Deleted.</p>
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
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    const username = req.body.username as unknown as string;
    const password = req.body.password as unknown as string;
    if (!firstname || !lastname || !username || !password) {
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
    const user: User = await userStores.create({
      firstname,
      lastname,
      username,
      password,
    });
    res.json(gettingTheTokenFromUser(user));
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;
    if (!firstname || !lastname || !id) {
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
    const user: User = await userStores.update(id, {
      firstname,
      lastname,
    });
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const readingTheUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      return res.status(400).send(`<!DOCTYPE html>
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
    }
    const user: User = await userStores.read(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const routesOfUsers = (app: Application) => {
  app.delete('/usersroutes/:id', verifyingTheToken, deleteTheUser);
  app.put('/usersroutes/:id', verifyingTheToken, update);
  app.post('/usersroutes/authenticate', authenticate);
  app.get('/usersroutes/:id', readingTheUser);
  app.post('/usersroutes/create', create);
  app.get('/usersroutes', index);
}

export default routesOfUsers;