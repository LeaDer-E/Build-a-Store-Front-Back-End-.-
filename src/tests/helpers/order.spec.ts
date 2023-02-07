/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MainOrder, OrderStore } from '../../models/orderUnit';
import { AuthenticationMainUser } from '../../models/userUnit';
import { MainProduct } from '../../models/productUnit';
import jwt, { Secret } from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Handler The Order', () => {
  let theToken: string;

  beforeAll(async () => {
    const dataOfTheUser: AuthenticationMainUser = {
      username: 'EslamMustafa',
      firstname:'Eslam',
      lastname:'Mustafa',
      password: 'password123',
    };

    const productData: MainProduct = {
      name: 'CPU',
      price: 234,
    };

    const { body: userBody } = await request.post('/usersroutes/create').send(dataOfTheUser);
    theToken = userBody;

    spyOn(OrderStore.prototype, 'create').and.returnValue(Promise.resolve({
        id: 1,
        products: [{
            product_id: 5,
            quantity: 5,
          }],
        user_id: 3,
        status: true,
      })
    );

    spyOn(OrderStore.prototype, 'update').and.returnValue(Promise.resolve({
        id: 2,
        products: [{
            product_id: 5,
            quantity: 5,
          }],
        user_id: 3,
        status: false,
      })
    );
  });

  it('Creating Order End-Point', async (done) => {
    const res = await request
      .post('/ordersroutes/create').set('Authorization', 'Bearer ' + theToken).send({
        id: 1,
        products: [{
            product_id: 5,
            quantity: 5,
          }],
        user_id: 3,
        status: true,
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      products: [{
          product_id: 5,
          quantity: 5,
        }],
      user_id: 3,
      status: true,
    });
    done();
  });

  it('Get The Index End-Point', async (done) => {
    request.get('/ordersroutes').set('Authorization', 'bearer ' + theToken).then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Get The Read End-Point', async (done) => {
    request.get(`/orders/1`).set('Authorization', 'bearer ' + theToken).then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Get The Delete End-Point', async (done) => {
    request.delete(`/orders/2`).set('Authorization', 'bearer ' + theToken).then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
