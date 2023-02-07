import { AuthenticationMainUser } from '../../models/userUnit';
import jwt, { Secret } from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../server';

const Secret_Token_Key = process.env.TOKEN_KEY as Secret;
const request = supertest(app);


describe('Handler The User', () => {
  const dataOfUser: AuthenticationMainUser = {
    username: 'EslamMustafa',
    firstname:'Eslam',
    lastname:'Mustafa',
    password: 'password123',
  };

  let theToken: string;
  let idOfUser = 1;

  it('Get The Create End-Point', async (done) => {
    const res = await request.post('/usersroutes/create').send(dataOfUser);
    const { body, status } = res;
    theToken = body;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { user } = jwt.verify(theToken, Secret_Token_Key);
    idOfUser = user.id;
    expect(status).toBe(200);
    done();
  });

  it('Get The Index End-Point', async (done) => {
    const res = await request.get('/usersroutes').set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Read End-Point', async (done) => {
    const res = await request.get(`/users/${idOfUser}`).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Update End-Point', async (done) => {
    const newdataOfUser: AuthenticationMainUser = {
      ...dataOfUser,
      firstname:'Eslam',
      lastname:'Mustafa',
    };
    const res = await request.put(`/users/${idOfUser}`).send(newdataOfUser).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Authenticate End-Pont', async (done) => {
    const res = await request.post('/usersroutes/authenticate').send({
        username: dataOfUser.username,
        password: dataOfUser.password,
      }).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });

  it('Get The Authenticate With Wrong Password', async (done) => {
    const res = await request.post('/usersroutes/authenticate').send({
        username: dataOfUser.username,
        password: 'trtdtxcfcf',
      }).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(401);
    done();
  });

  it('Get The Delete End-Point', async (done) => {
    const res = await request.delete(`/users/${idOfUser}`).set('Authorization', 'bearer ' + theToken);
    expect(res.status).toBe(200);
    done();
  });
});
