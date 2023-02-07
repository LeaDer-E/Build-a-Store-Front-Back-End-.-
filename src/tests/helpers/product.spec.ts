import { AuthenticationMainUser } from '../../models/userUnit';
import { MainProduct } from '../../models/productUnit';
import jwt, { Secret } from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../server';

const Secret_Token_Key = process.env.TOKEN_KEY as Secret;
const request = supertest(app);

describe('Handler The Product', () => {
  const product: MainProduct = {
    name: 'CPU',
    price: 29,
  };

  let theToken: string;
  let idOfUser: number;

  beforeAll(async () => {
    const dataOfTheUser: AuthenticationMainUser = {
      username: 'EslamMustafa',
      firstname:'Eslam',
      lastname:'Mustafa',
      password: 'password123',
    };

    const { body } = await request.post('/usersroutes/create').send(dataOfTheUser);
    theToken = body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user } = jwt.verify(body, Secret_Token_Key);
    idOfUser = user.id;
  });

  afterAll(async () => {
    await request.delete(`/users/${idOfUser}`).set('Authorization', 'bearer ' + theToken);
  });

  it('Get The Create End-Point', async (done) => {
    const res = await request.post('/productsroutes/create').send(product).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Inxdex End-Point', async (done) => {
    const res = await request.get('/productsroutes');
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Read End-Point', async (done) => {
    const res = await request.get(`/products/2`);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Update End-Point', async (done) => {
    const theNewProduct: MainProduct = {
      ...product,
      name: 'RAM',
      price: 234,
    };
    const res = await request.put(`/products/1`).send(theNewProduct).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Delete End-Point', async (done) => {
    const res = await request.delete(`/products/2`).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });
});
